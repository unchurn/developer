"use client";

import { Dithering } from "@paper-design/shaders-react";
import * as React from "react";

const MemoizedDithering = React.memo(Dithering);

interface HeroDitheringProps {
  className?: string;
  colorFront?: string;
  colorBack?: string;
  speed?: number;
  scale?: number;
}

export function HeroDithering({
  className,
  colorFront = "#a78bfa",
  colorBack = "#050505",
  speed = 1.02,
  scale = 0.64,
}: HeroDitheringProps) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <MemoizedDithering
        colorBack={colorBack}
        colorFront={colorFront}
        shape="swirl"
        type="4x4"
        size={2}
        speed={speed}
        scale={scale}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

export default HeroDithering;
