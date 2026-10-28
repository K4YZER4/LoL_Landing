import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  className: string;
  src: string;
}

export default function BackgroundVideo({
  className,
  src,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion.matches || !entry?.isIntersecting) {
          video.pause();
          return;
        }

        void video.play().catch(() => undefined);
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    const handleMotionPreference = () => {
      if (reduceMotion.matches) {
        video.pause();
      } else if (video.getBoundingClientRect().top < window.innerHeight + 200) {
        void video.play().catch(() => undefined);
      }
    };

    reduceMotion.addEventListener("change", handleMotionPreference);
    observer.observe(video);

    return () => {
      reduceMotion.removeEventListener("change", handleMotionPreference);
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
