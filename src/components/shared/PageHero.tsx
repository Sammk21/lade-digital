import type { ReactNode } from "react";
import RevealText from "./RevealText";
import Container from "./Container";

type PageHeroProps = {
  /** Small uppercase kicker above the headline (rendered as a <p>, not a heading). */
  eyebrow?: string;
  /** The page headline — the single <h1> for the page. */
  title: string;
  /** Optional lead/sub-paragraph under the headline. */
  lead?: string;
  /** Optional slot below the lead (e.g. a hero CTA button). */
  children?: ReactNode;
  /** Override the headline's per-word reveal duration (HomeHero uses a slow 2s). */
  titleDuration?: string | number;
  /** Override the headline measure (defaults to a centered max-w-5xl). */
  titleClassName?: string;
};

// Shared, centered page hero. Owns the responsive top/bottom rhythm
// (pt-36 → md:pt-52, the same ramp the home hero used) so inner pages stop
// dumping content a third of the way down on phones, and guarantees exactly
// one <h1> per page with the kicker demoted to a <p className="eyebrow"> —
// fixing the inverted h1/h2 hierarchy that used to live in each hero.
export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
  titleDuration,
  titleClassName = "mx-auto block max-w-5xl text-center",
}: PageHeroProps) {
  return (
    <section className="relative pb-20 pt-36 md:pb-28 md:pt-52">
      <Container>
        {eyebrow ? (
          <RevealText
            as="p"
            text={eyebrow}
            className="eyebrow mb-6 block text-center"
            delay={0.05}
          />
        ) : null}

        <RevealText
          as="h1"
          text={title}
          duration={titleDuration}
          className={`display-xl ${titleClassName}`}
          delay={eyebrow ? 0.15 : 0.05}
          stagger={0.07}
        />

        {lead ? (
          <RevealText
            as="p"
            text={lead}
            className="mx-auto mt-6 block max-w-210 text-center text-apple-subhead leading-apple-subhead tracking-apple-subhead text-apple-text-secondary md:mt-10 lg:mt-12"
            delay={0.25}
            stagger={0.03}
          />
        ) : null}

        {children ? (
          <div className="mt-10 flex justify-center md:mt-12">{children}</div>
        ) : null}
      </Container>
    </section>
  );
}
