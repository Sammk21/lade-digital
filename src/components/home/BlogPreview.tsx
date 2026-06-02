import RevealUp from "../shared/RevealUp";
import SectionHeading from "../shared/SectionHeading";
import SectionCta from "../shared/SectionCta";
import BlogPostCard from "../shared/BlogPostCard";
import { getAllPosts } from "@/lib/blog";

// Panel chrome (rounded-top, ink bg, container, padding) lives in the
// <Section variant="overlap"> wrapper on the home page — this renders content.
export default async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <SectionHeading id="blog-heading" text="Blog" />

      <div className="grid gap-8 md:gap-10">
        {posts.map((post, i) => (
          <RevealUp key={post.slug} delay={i * 100}>
            <BlogPostCard post={post} theme="paper" />
          </RevealUp>
        ))}
      </div>

      <SectionCta href="/blog" label="Visit our blog" variant="paper" />
    </>
  );
}
