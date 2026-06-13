"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------------------------------
   Smooth scrolling — Lenis, driven by GSAP's ticker.

   The app already ships GSAP, which runs its own requestAnimationFrame loop.
   Rather than let Lenis spin up a SECOND rAF loop, we disable Lenis's
   `autoRaf` and step it from GSAP's single ticker — one loop per frame for
   both libraries. This keeps any future ScrollTrigger work perfectly in sync
   and avoids redundant per-frame work.

   Project-specific concerns:
     1. Route changes go through the View Transition curtain (see
        TransitionProvider). Lenis keeps its own virtual scroll position, so on
        every pathname change we snap it back to the top immediately.
     2. `prefers-reduced-motion` users get native scrolling.
   ------------------------------------------------------------------------- */

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Step Lenis from GSAP's ticker (one shared rAF). GSAP's ticker time is in
  // seconds; Lenis.raf expects milliseconds. We also forward Lenis's virtual
  // scroll position to ScrollTrigger so any ScrollTrigger-driven animation
  // stays perfectly in sync with the smooth scroll.
  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    // GSAP smooths delta time by default; disable so scroll tracks the wheel 1:1.
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  // Reset to the top on every internal navigation, without animating the jump.
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // Frame-rate-independent feel (consistent on 60Hz and 120Hz displays).
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: !reduced,
        syncTouch: false,
        // We drive rAF ourselves via GSAP's ticker above.
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
