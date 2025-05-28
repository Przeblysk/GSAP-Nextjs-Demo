"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Demo10Page() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const videoElement = video.current;
    if (!videoElement) return;

    const handleCanPlayThrough = () => {
      setIsVideoReady(true);
    };

    // 使用 canplaythrough 确保视频完全缓冲
    videoElement.addEventListener("canplaythrough", handleCanPlayThrough);

    // 预加载视频
    videoElement.load();

    return () => {
      videoElement.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, []);

  useGSAP(
    () => {
      if (!isVideoReady || !video.current) return;

      const videoElement = video.current;

      gsap.timeline({
        scrollTrigger: {
          trigger: videoElement,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          markers: true,
          onUpdate: (self) => {
            requestAnimationFrame(() => {
              if (videoElement && !videoElement.seeking) {
                const targetTime = self.progress * videoElement.duration;
                videoElement.currentTime = targetTime;
              }
            });
          },
        },
      });
    },
    {
      scope: container,
      dependencies: [isVideoReady],
    },
  );

  return (
    <div className="w-full h-screen bg-black" ref={container}>
      <div className="video-container w-full bg-black">
        <video
          className="w-full object-cover"
          src="/videos/1.mp4"
          muted
          preload="auto"
          playsInline
          ref={video}
        />
      </div>
      <div className="h-[500vh] w-full bg-red-500" />
    </div>
  );
}
