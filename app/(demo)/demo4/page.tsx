"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const Box = ({
  children,
  x,
}: {
  children: React.ReactNode;
  x: number;
}) => {
  useGSAP(() => {
    gsap.to(".box", {
      x,
    });
  }, [x]);
  return (
    <div className="box w-50 h-50 bg-[#0AE148] rounded-xl flex justify-center items-center">
      {children}
    </div>
  );
};

const randomX = gsap.utils.random(-200, 200, 1, true);

export default function Demo4Page() {
  const [x, setX] = useState(0);
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      <button type="button" onClick={() => setX(randomX())}>
        Move
      </button>
      <Box x={x}>x: {x}</Box>
    </div>
  );
}
