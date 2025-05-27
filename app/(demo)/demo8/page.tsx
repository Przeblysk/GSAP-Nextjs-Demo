"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type MouseEvent, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

function Box({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="box w-30 h-30 bg-[#0AE148] rounded-xl flex justify-center items-center">
      {children}
    </div>
  );
}

export default function Demo8Page() {
  const container = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(true);

  const { contextSafe } = useGSAP({ scope: container });

  const remove = contextSafe(() => {
    gsap.to(".box", {
      opacity: 0,
      onComplete: () => {
        setShow(false);
      },
    });
  });

  return (
    <div
      className="w-full h-screen bg-black flex flex-col items-center justify-center space-y-4"
      ref={container}
    >
      <Button onClick={remove}>Remove</Button>

      {show ? <Box>Box1</Box> : null}
    </div>
  );
}
