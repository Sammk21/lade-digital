import ProjectCard from "../shared/ProjectCard";
import SectionHeading from "../shared/SectionHeading";
import SectionCta from "../shared/SectionCta";
import FeaturedRow from "./FeaturedRow";
import { FEATURED } from "@/lib/projects";

// Panel chrome (rounded-top, dark bg, container, padding) lives in the
// <Section variant="overlap"> wrapper on the home page — this renders content.
export default function FeaturedProjects() {
  return (
    // overflow-x-clip so the cards can start off-screen (far left / far right)
    // without spawning a horizontal scrollbar during the slide-in. The section
    // is full-bleed (no Container gutters) so the cards reach toward the screen
    // edges; a light local gutter keeps content off the very edge.
    <div className="overflow-x-clip px-6 pb-10 md:px-12">
      <SectionHeading id="featured-heading" text="Featured projects" />

      {/* One card per row, stacked. Each card is 70% width and pinned to the
          left (full width on mobile). Rows alternate their scroll-in direction:
          odd rows fly in from the far left, even rows from the far right. */}
      <div className="flex flex-col gap-16 md:gap-28 lg:gap-36">
        {FEATURED.map((p, i) => (
          <FeaturedRow key={p.slug} side={i % 2 === 0 ? "left" : "right"}>
            <ProjectCard project={p} theme="paper" tall={false} />
          </FeaturedRow>
        ))}
      </div>

      <SectionCta href="/projects" label="View all projects" variant="paper" />
    </div>
  );
}