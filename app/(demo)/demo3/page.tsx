"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

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
  const [x, setX] = useState(0);
  const { contextSafe } = useGSAP(
    () => {
      tl.current = gsap
        .timeline()
        .to(".box", {
          x,
          stagger: 0.5,
        })
        .to(".circle", {
          x,
        });
    },
    { scope: container, dependencies: [x] },
  );

  const onClickBox = contextSafe(() => {
    tl.current?.reversed(!tl.current?.reversed());
  });

  return (
    <div ref={container} className="w-full h-screen bg-black">
      <button type="button" onClick={() => setX(x + 100)}>
        Move
      </button>
      <Box onClick={onClickBox}>Box1</Box>
      <Box onClick={onClickBox}>Box2</Box>
      <Box onClick={onClickBox}>Box3</Box>
      <Circle />
    </div>
  );
}
