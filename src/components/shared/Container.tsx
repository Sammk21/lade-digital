import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "wide";

type ContainerProps = {
  children: ReactNode;
  /**
   * default — the editorial gutters used across most sections.
   * wide    — pulls the gutters in for media-led sections (e.g. the showreel)
   *           so the visual fills more of the viewport on large screens.
   */
  width?: ContainerWidth;
  className?: string;
  as?: ElementType;
};

// Single source of truth for the page's horizontal rhythm: one max-width with
// gutters that grow from phone → tablet → desktop. Previously this string was
// re-typed (and drifted) across HomeHero, Showreel, AboutSummary and Section.
// max-w-[1600px] == the old `max-w-400` (400 × 0.25rem = 100rem = 1600px).
const GUTTERS: Record<ContainerWidth, string> = {
  default: "px-6 md:px-12 lg:px-60",
  wide: "px-6 md:px-12 lg:px-[7.5rem]",
};

export default function Container({
  children,
  width = "default",
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1600px]", GUTTERS[width], className)}>
      {children}
    </Tag>
  );
}

export type { ContainerWidth };
