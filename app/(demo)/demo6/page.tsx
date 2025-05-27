"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type MouseEvent, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

function Box({
  children,
  timeline,
  index,
}: {
  children: React.ReactNode;
  timeline: GSAPTimeline | undefined;
  index: number;
}) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    timeline?.to(
      el.current,
      {
        x: -100,
      },
      index,
    );
  }, [timeline, index]);

  return (
    <div
      className="w-30 h-30 bg-[#0AE148] rounded-xl flex justify-center items-center"
      ref={el}
    >
      {children}
    </div>
  );
}

function Circle({
  children,
  timeline,
  index,
  rotation,
}: {
  children: React.ReactNode;
  timeline: GSAPTimeline | undefined;
  index: number;
  rotation: number;
}) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    timeline?.to(
      el.current,
      {
        rotation: rotation,
        x: 100,
      },
      index,
    );
  }, [timeline, rotation, index]);

  return (
    <div
      className="w-30 h-30 text-background bg-white rounded-full flex justify-center items-center"
      ref={el}
    >
      {children}
    </div>
  );
}

export default function Demo6Page() {
  const [tl, setTl] = useState<GSAPTimeline>();

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();
    setTl(tl);
  });

  const toggle = contextSafe(() => {
    tl?.reversed(!tl?.reversed());
  });

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <Button onClick={toggle}>Toggle</Button>
      <Box timeline={tl} index={0}>
        Box
      </Box>
      <Circle timeline={tl} rotation={360} index={1}>
        Circle
      </Circle>
    </div>
  );
}
