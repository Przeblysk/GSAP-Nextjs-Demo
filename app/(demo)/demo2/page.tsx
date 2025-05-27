"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Box = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="box w-10 h-10 bg-[#0AE148] rounded-xl flex justify-center items-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Circle = () => {
  return <div className="circle w-10 h-10 bg-white rounded-full" />;
};

export default function Demo2Page() {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>(null);
  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .to(".box", {
          x: 200,
          stagger: 0.5,
        })
        .to(".circle", {
          x: 100,
        });
    },
    { scope: container },
  );

  const onClickBox = contextSafe(() => {
    tl.current?.reversed(!tl.current?.reversed());
  });

  return (
    <div ref={container} className="w-full h-screen bg-black">
      <Box onClick={onClickBox}>Box1</Box>
      <Box onClick={onClickBox}>Box2</Box>
      <Box onClick={onClickBox}>Box3</Box>
      <Circle />
    </div>
  );
}
