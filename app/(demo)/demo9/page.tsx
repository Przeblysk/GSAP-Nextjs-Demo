"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { type MouseEvent, useCallback, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Flip);

const wrapColor = gsap.utils.wrap(["green", "blue", "red", "orange"]);

const initialItems = [
  { id: 0, color: "green", status: "entered" as const },
  { id: 1, color: "blue", status: "entered" as const },
  { id: 2, color: "red", status: "entered" as const },
  { id: 3, color: "orange", status: "entered" as const },
].reverse();

type Item = {
  id: number;
  color: string;
  status: "entered" | "exiting";
};

const colorMap = {
  green: "bg-green-100",
  blue: "bg-blue-100",
  red: "bg-red-100",
  orange: "bg-orange-100",
} as const;

export default function Demo9Page() {
  const container = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(container);
  const count = useRef(4);

  const createItem = () => {
    return {
      id: count.current++,
      color: wrapColor(count.current % 4),
      status: "entered",
    } as Item;
  };

  const removeItems = useCallback(
    (exitingItems: Item[]) => {
      if (!exitingItems.length) return;

      setLayout((prev) => ({
        state: Flip.getState(q(".box, .button")),
        items: prev.items.filter((item) => !exitingItems.includes(item)),
      }));
    },
    [q],
  );

  const [layout, setLayout] = useState<{
    items: Item[];
    state: Flip.FlipState | undefined;
  }>({
    items: initialItems,
    state: undefined,
  });

  useGSAP(
    () => {
      if (!layout.state) return;

      const exiting = layout.items.filter((item) => item.status === "exiting");
      const timeline = Flip.from(layout.state, {
        absolute: true,
        ease: "power1.inOut",
        targets: q(".box, .button"),
        scale: true,
        simple: true,
        onEnter: (elements) => {
          return gsap.fromTo(
            elements,
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              delay: 0.2,
              duration: 0.3,
            },
          );
        },
        onLeave: (elements) => {
          return gsap.to(elements, {
            opacity: 0,
            scale: 0,
          });
        },
        onComplete() {
          // works around a Safari rendering bug (unrelated to GSAP). Things reflow narrower otherwise.
          const boxes = document.querySelector(".boxes");
          if (boxes) {
            const lastChild = boxes.lastChild as HTMLElement;
            boxes.appendChild(lastChild);
          }
        },
      });

      timeline.add(() => removeItems(exiting));
    },
    {
      dependencies: [layout, q, removeItems],
    },
  );

  const addItem = () => {
    setLayout((prev) => ({
      state: Flip.getState(q(".box, .button")),
      items: [createItem(), ...prev.items],
    }));
  };

  const shuffle = () => {
    setLayout({
      state: Flip.getState(q(".box, .button")),
      items: [...gsap.utils.shuffle(layout.items)],
    });
  };

  const remove = (item: Item) => {
    item.status = "exiting";

    setLayout({
      ...layout,
      state: Flip.getState(q(".box, .button")),
    });
  };

  return (
    <div
      className="w-full h-screen bg-black flex flex-col items-center justify-center space-y-4"
      ref={container}
    >
      <div className="flex items-center space-x-4">
        <Button className="button" onClick={addItem}>
          ADD BOX
        </Button>
        <Button className="button" onClick={shuffle}>
          SHUFFLE
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {layout.items.map((item) => {
          return (
            <div
              key={item.id}
              className={`box w-30 h-30 text-background ${colorMap[item.color as keyof typeof colorMap]} rounded-xl flex justify-center items-center`}
              onClick={() => remove(item)}
            >
              {item.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}
