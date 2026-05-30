import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import Reveal from "@/components/shared/Reveal";
import HomeHero from "@/components/home/HomeHero";
import Showreel from "@/components/home/Showreel";
import AboutSummary from "@/components/home/AboutSummary";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesPreview from "@/components/home/ServicesPreview";
import BlogPreview from "@/components/home/BlogPreview";
import HaveAnIdea from "@/components/project/HaveAnIdea";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Digital Design & Development Agency",
  description:
    "We help companies build scalable digital products with thoughtful design systems and carefully crafted development.",
  openGraph: {
    title: "Digital Design & Development Agency",
    description:
      "We design and build websites, platforms, mobile apps, and brands.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <GetInTouch />
      <main>
        <HomeHero />
        {/* Everything below the hero rises + fades in as it scrolls into view. */}
        <Reveal delay={1000}>
          <Showreel />
        </Reveal>
        <Reveal>
          <AboutSummary />
        </Reveal>
        {/* Each section below uses a rounded-top panel that overlaps the
            previous one by 80px, recreating the source's stacked reveal. */}
        <Reveal className="-mt-20">
          <FeaturedProjects />
        </Reveal>
        <Reveal className="-mt-20">
          <ServicesPreview />
        </Reveal>
        <Reveal className="-mt-20">
          <BlogPreview />
        </Reveal>
        <Reveal>
          <HaveAnIdea />
        </Reveal>
      </main>
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}