import PillButton from "./PillButton";

type SectionCtaProps = {
  href: string;
  label: string;
  variant?: "ink" | "paper";
};

// The centered "View all …" pill that closes each home section. Standardises
// the spacing on the responsive mt-20 → md:28 → lg:32 ramp (FeaturedProjects
// previously used my-…; the panel's own pb supplies the bottom space).
export default function SectionCta({ href, label, variant = "ink" }: SectionCtaProps) {
  return (
    <div className="mt-20 text-center md:mt-28 lg:mt-32">
      <PillButton href={href} label={label} variant={variant} />
    </div>
  );
}
