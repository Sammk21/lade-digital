"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* One row of the stacked featured list. The card fades up with a slight scale
   as it scrolls into view. `side` still drives the layout (rows alternate their
   left/right rest position), but the entrance itself is a smooth opacity +
   scale reveal — no horizontal slide.

   Honors prefers-reduced-motion: the card just appears. */
export default function FeaturedRow({
  children,
  side,
}: {
  children: ReactNode;
  /** Which side the card rests on (alternates down the stack). */
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Hide before the first ScrollTrigger evaluation to avoid a flash of the
      // settled card on load.
      gsap.set(el, { opacity: 0, scale: 0.94 });

      // Fade up + slight scale as the row enters view. A numeric scrub adds a
      // little catch-up smoothing so the reveal eases rather than tracking the
      // wheel 1:1.
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [side]);

  return (
    <div
      ref={ref}
      className={`w-full will-change-transform md:w-[70%] ${
        side === "right" ? "md:ml-auto" : ""
      }`}
    >
      {children}
    </div>
  );
}
