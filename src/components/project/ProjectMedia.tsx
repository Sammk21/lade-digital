import Image from "next/image";
import { gradientFor } from "@/lib/gradient";
import type { MediaAspect } from "@/lib/projects";
import MediaFrame from "@/components/shared/MediaFrame";

type ProjectMediaProps = {
  /** Seed for the deterministic placeholder gradient (keep unique per frame). */
  seed: string;
  /** Real artwork path under /public; undefined → gradient placeholder. */
  src?: string;
  alt?: string;
  aspect?: MediaAspect;
  /** Faint art-direction note shown on the placeholder. */
  label?: string;
  className?: string;
  /** `next/image` sizes hint when a real image is provided. */
  sizes?: string;
};

/**
 * A rounded media frame used across the case-study layout. Drop an image at
 * /public/assets/projects/<slug>/<name>.jpg and pass its path as `src` to swap
 * the gradient placeholder for the real artwork — no other change needed.
 */
export default function ProjectMedia({
  seed,
  src,
  alt = "",
  aspect = "wide",
  label,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: ProjectMediaProps) {
  return (
    <MediaFrame aspect={aspect} className={`group bg-ink/5 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt || label || ""}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
            style={{ background: gradientFor(seed) }}
          />
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), transparent 45%)",
            }}
          />
          {label ? (
            <div className="absolute inset-0 grid place-items-center p-6">
              <span className="text-center text-sm uppercase tracking-[0.18em] text-white/45">
                {label}
              </span>
            </div>
          ) : null}
        </>
      )}
    </MediaFrame>
  );
}
