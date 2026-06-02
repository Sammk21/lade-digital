import RevealUp from "../shared/RevealUp";
import ProjectCard from "../shared/ProjectCard";
import SectionHeading from "../shared/SectionHeading";
import SectionCta from "../shared/SectionCta";
import { FEATURED_LEFT, FEATURED_RIGHT } from "@/lib/projects";

// Panel chrome (rounded-top, dark bg, container, padding) lives in the
// <Section variant="overlap"> wrapper on the home page — this renders content.
export default function FeaturedProjects() {
  return (
    <div className="pb-10">
      <SectionHeading id="featured-heading" text="Featured projects" />

      {/* 1. Changed to grid-cols-2 universally so it stays side-by-side on mobile.
        2. Added smaller mobile gaps (gap-x-4) to prevent squishing.
      */}
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 lg:gap-x-24 ">
        
        {/* Left Column */}
        <div className="grid gap-8 md:gap-16 lg:gap-24">
          {FEATURED_LEFT.map((p, i) => (
            <RevealUp key={p.slug} delay={i * 100}>
              {/* layout="grid" is the default now, so we don't need to pass it */}
              <ProjectCard project={p} theme="paper" tall={p.tall} />
            </RevealUp>
          ))}
        </div>
        
        {/* Right Column (Offset) */}
        {/* Adjusted the mobile top-margin (mt-16) so the offset looks proportional on smaller screens */}
        <div className="mt-16 grid gap-8 md:mt-[331px] md:gap-16 lg:gap-24">
          {FEATURED_RIGHT.map((p, i) => (
            <RevealUp key={p.slug} delay={i * 100}>
              <ProjectCard project={p} theme="paper" tall={p.tall} />
            </RevealUp>
          ))}
        </div>
        
      </div>

      <SectionCta href="/projects" label="View all projects" variant="paper" />
    </div>
  );
}