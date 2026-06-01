"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** rise distance in px before it settles */
  y?: number;
  /** delay (ms) after it enters view before animating */
  delay?: number;
};

/**
 * Reveals its children as they scroll into view: a soft rise + fade, driven by
 * an IntersectionObserver. Fires once, then stops observing. The look lives in
 * the `.reveal-up` rule (globals.css); this only toggles `data-shown`.
 *
 * Degrades safely: no IntersectionObserver → shown on the next frame, while
 * reduced-motion and no-JS are handled in CSS (`.reveal-up` fallbacks).
 */
export default function Reveal({
  children,
  className = "",
  y = 28,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    // Pre-IntersectionObserver browsers: just reveal on the next frame.
    // (Reduced-motion and no-JS are handled in CSS — see `.reveal-up`.)
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={`reveal-up ${className}`}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
