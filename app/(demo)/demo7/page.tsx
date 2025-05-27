"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type MouseEvent, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

function FadeIn({
  children,
  vars,
  ref,
}: {
  children: React.ReactNode;
  vars: gsap.TweenVars;
  ref: React.RefObject<GSAPTween | null> | ((instance: GSAPTween) => void);
}) {
  const el = useRef<HTMLDivElement>(null);

  const animation = useRef<GSAPTween>(null);

  useGSAP(() => {
    animation.current = gsap.from(el.current?.children as HTMLCollection, {
      opacity: 0,
      ...vars,
    });
  });

  useGSAP(() => {
    if (typeof ref === "function") {
      ref(animation.current as GSAPTween);
    } else if (ref) {
      ref.current = animation.current as GSAPTween;
    }
  }, [ref]);

  return (
    <div
      className="flex flex-col justify-center items-center space-y-2"
      ref={el}
    >
      {children}
    </div>
  );
}

function Box({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-30 h-30 bg-[#0AE148] rounded-xl flex justify-center items-center">
      {children}
    </div>
  );
}

export default function Demo7Page() {
  const animation = useRef<GSAPTween>(null);

  const toggle = () => {
    animation.current?.reversed(!animation.current?.reversed());
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <Button onClick={toggle}>Toggle</Button>
      <FadeIn
        vars={{ duration: 1, ease: "power1.inOut", stagger: 0.1, y: 100 }}
        ref={animation}
      >
        <Box>Box1</Box>
        <Box>Box2</Box>
      </FadeIn>
    </div>
  );
}
