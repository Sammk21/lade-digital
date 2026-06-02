import type { ElementType, ReactNode } from "react";
import Container from "./Container";

type SectionVariant = "normal" | "rounded" | "overlap";

type SectionProps = {
  children: ReactNode;
  /**
   * normal  — plain section, just the centered container + vertical padding.
   * rounded — rounded-top panel sitting on a dark background.
   * overlap — rounded-top panel that overlaps the previous section (-mt-20),
   *           recreating the stacked-reveal look used on the home page.
   */
  variant?: SectionVariant;
  /** background applied to the panel (rounded/overlap). Defaults to #161616. */
  bg?: string;
  /** drop the centered max-width container to lay out full-bleed children */
  bleed?: boolean;
  /** extra classes on the outer <section> */
  className?: string;
  /** extra classes on the inner container */
  innerClassName?: string;
  /** id of the heading that names this section → sets aria-labelledby so the
   *  section becomes a distinguishable landmark (pair with <SectionHeading id>). */
  labelledBy?: string;
  as?: ElementType;
};

// The dark stacked panels overlap the previous section and round their top
// corners — the inner padding here gives that overlap room to breathe. Radius
// and top padding scale up phone → desktop so panels don't feel oversized on
// small screens.
const PANEL =
  "rounded-t-[40px] pb-2 pt-20 md:rounded-t-[60px] md:pt-28 lg:rounded-t-[80px] lg:pt-36";

/**
 * Layout + spacing wrapper that keeps sections consistent. Pick a `variant`
 * for plain, rounded-top, or overlapping rounded-top panels — all share the
 * same centered container and horizontal padding. Pair with the Reveal*
 * wrappers when you also want an entrance animation.
 */
export default function Section({
  children,
  variant = "normal",
  bg = "#161616",
  bleed = false,
  className = "",
  innerClassName = "",
  labelledBy,
  as: Tag = "section",
}: SectionProps) {
  const isPanel = variant === "rounded" || variant === "overlap";

  // overlap pulls the panel up over the section above it.
  const outer = [
    "relative",
    variant === "overlap" ? "-mt-20" : "",
    variant === "normal" ? "py-20" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // bleed lays children out full-bleed (no centered container); otherwise the
  // shared Container provides the max-width + responsive gutters.
  const content = bleed ? (
    <div className={innerClassName}>{children}</div>
  ) : (
    <Container className={innerClassName}>{children}</Container>
  );

  if (isPanel) {
    return (
      <Tag className={outer} aria-labelledby={labelledBy}>
        <div className={PANEL} style={{ backgroundColor: bg }}>
          {content}
        </div>
      </Tag>
    );
  }

  return (
    <Tag className={outer} aria-labelledby={labelledBy}>
      {content}
    </Tag>
  );
}

export type { SectionVariant };
