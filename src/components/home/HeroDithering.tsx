"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const fragmentShader = `
precision highp float;
varying vec2 vUv;

uniform float time;
uniform vec2 resolution;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform float colorNum;
uniform float pixelSize;
uniform float ditherBias;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

const float bayer[16] = float[16](
  0.0, 8.0, 2.0, 10.0,
  12.0, 4.0, 14.0, 6.0,
  3.0, 11.0, 1.0, 9.0,
  15.0, 7.0, 13.0, 5.0
);

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;

  vec2 portalUv = vec2(uv.x * 1.02, uv.y * 0.66);
  float portal = length(portalUv);
  float angle = atan(portalUv.y, portalUv.x);
  float spin = time * waveSpeed * 5.0;

  float outerMask = 1.0 - smoothstep(0.88, 0.98, portal);
  float innerMask = smoothstep(0.22, 0.34, portal);
  float portalMask = outerMask * innerMask;

  float spiral = 0.5 + 0.5 * sin(angle * 5.0 - portal * 17.0 - spin);
  float blades = smoothstep(0.43, 0.72, spiral);

  float secondary = 0.5 + 0.5 * sin(angle * 10.0 + portal * 24.0 - spin * 1.35);
  float ridges = mix(0.82, 1.18, secondary);

  float grain = noise(vec2(angle * waveFrequency * 1.8, portal * 12.0 - spin)) * waveAmplitude;
  float portalValue = portalMask * mix(0.08, 1.0, blades) * ridges;
  portalValue *= 0.92 + grain;

  float innerGlow = smoothstep(0.34, 0.52, portal) * (1.0 - smoothstep(0.52, 0.72, portal));
  portalValue += innerGlow * 0.18;
  portalValue = clamp(portalValue, 0.0, 1.0);

  vec3 col = mix(backgroundColor, waveColor, portalValue);

  vec2 pixelCoord = floor(gl_FragCoord.xy / pixelSize);
  int idx = int(mod(pixelCoord.x, 4.0)) + int(mod(pixelCoord.y, 4.0)) * 4;
  float threshold = (bayer[idx] - 8.0) / 16.0;
  col += threshold / (colorNum - 1.0);
  col = clamp(col - ditherBias, 0.0, 1.0);
  col = floor(col * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface WaveMeshProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  backgroundColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  ditherBias: number;
}

function WaveMesh({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  backgroundColor,
  colorNum,
  pixelSize,
  ditherBias,
}: WaveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(1, 1) },
      waveSpeed: { value: waveSpeed },
      waveFrequency: { value: waveFrequency },
      waveAmplitude: { value: waveAmplitude },
      waveColor: { value: new THREE.Color(...waveColor) },
      backgroundColor: { value: new THREE.Color(...backgroundColor) },
      colorNum: { value: colorNum },
      pixelSize: { value: pixelSize },
      ditherBias: { value: ditherBias },
    }),
    [
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      waveColor,
      backgroundColor,
      colorNum,
      pixelSize,
      ditherBias,
    ],
  );

  useFrame(({ clock, size }) => {
    const u = uniforms;
    u.time.value = clock.getElapsedTime();
    u.resolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface HeroDitheringProps {
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  colorNum?: number;
  ditherBias?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
  className?: string;
}

export function HeroDithering({
  waveColor = [0.7, 0.5, 1.0],
  backgroundColor = [0.03, 0.03, 0.04],
  colorNum = 4,
  ditherBias = 0.06,
  waveAmplitude = 0.22,
  waveFrequency = 3.2,
  waveSpeed = 0.12,
  className,
}: HeroDitheringProps) {
  return (
    <div className={`${className ?? ""} overflow-hidden bg-black`}>
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 6] }}
        dpr={1}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <WaveMesh
          waveSpeed={waveSpeed}
          waveFrequency={waveFrequency}
          waveAmplitude={waveAmplitude}
          waveColor={waveColor}
          backgroundColor={backgroundColor}
          colorNum={colorNum}
          pixelSize={2}
          ditherBias={ditherBias}
        />
      </Canvas>
    </div>
  );
}

export default HeroDithering;
