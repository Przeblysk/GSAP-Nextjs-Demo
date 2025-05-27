"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type MouseEvent, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export default function Demo5Page() {
  const xTo = useRef<gsap.QuickToFunc>(null);
  const yTo = useRef<gsap.QuickToFunc>(null);
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo(".flair", "x", {
        duration: 0.8,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(".flair", "y", {
        duration: 0.8,
        ease: "power3",
      });
    },
    { scope: container },
  );

  const moveShape = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    xTo.current?.(e.clientX);
    yTo.current?.(e.clientY);
  });

  return (
    <div
      ref={container}
      className="w-full h-screen bg-black"
      onMouseMove={(e) => moveShape(e)}
    >
      <div className="flair w-10 h-10 bg-white rounded-full fixed top-0 left-0 translate-x-[-50%] translate-y-[-50%]" />
    </div>
  );
}
