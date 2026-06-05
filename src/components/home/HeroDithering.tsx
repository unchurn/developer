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

float fbm(vec2 p) {
  float v = 0.0;
  float amplitude = waveAmplitude;
  for (int i = 0; i < 3; i++) {
    v += noise(p * waveFrequency * (1.0 + float(i) * 0.5)) * amplitude;
    amplitude *= 0.5;
  }
  return v;
}

const float bayer[16] = float[16](
  0.0, 8.0, 2.0, 10.0,
  12.0, 4.0, 14.0, 6.0,
  3.0, 11.0, 1.0, 9.0,
  15.0, 7.0, 13.0, 5.0
);

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= resolution.x / resolution.y;

  float f = fbm(uv * 4.0 + time * waveSpeed) * 0.7 + 0.3;
  vec3 col = mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0));

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
  waveColor = [0.26, 0.35, 0.48],
  backgroundColor = [0.82, 0.86, 0.92],
  colorNum = 4,
  ditherBias = 0.1,
  waveAmplitude = 0.34,
  waveFrequency = 3,
  waveSpeed = 0.05,
  className,
}: HeroDitheringProps) {
  return (
    <div className={className}>
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
