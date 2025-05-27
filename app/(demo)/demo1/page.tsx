"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Demo1Page() {
  const container = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(
    () => {
      gsap.to(".box", { x: 360, stagger: 0.1 });
      gsap.to(circle.current, { x: 360, duration: 1, ease: "power2.inOut" });
    },
    { scope: container },
  );
  const onClickBox = contextSafe(() => {
    gsap.to(".box", { x: 0 });
  });
  return (
    <div ref={container} className="w-full h-screen bg-black">
      <div
        className="box w-10 h-10 bg-[#0AE148] rounded-xl"
        onClick={onClickBox}
      />
      <div
        className="box w-10 h-10 bg-[#0AE148] rounded-xl"
        onClick={onClickBox}
      />
      <div
        className="box w-10 h-10 bg-[#0AE148] rounded-xl"
        onClick={onClickBox}
      />

      <div ref={circle} className="w-10 h-10 bg-white rounded-full" />
    </div>
  );
}
