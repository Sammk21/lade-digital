import RevealText from "./RevealText";

type SectionHeadingProps = {
  text: string;
  /** id on the <h2> — set it and pass the same value to <Section labelledBy> so
   *  the section becomes a named landmark (aria-labelledby). */
  id?: string;
  className?: string;
};

// The per-word-revealed section title shared by every home/services section.
// Owns the responsive heading→content rhythm (mb-14 → md:20 → lg:28, per
// DESIGN_SYSTEM §6); the size itself steps via the .display-xl token.
export default function SectionHeading({ text, id, className = "" }: SectionHeadingProps) {
  return (
    <RevealText
      as="h2"
      id={id}
      text={text}
      className={`display-xl mb-14 block md:mb-20 lg:mb-28 ${className}`}
    />
  );
}
