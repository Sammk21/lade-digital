"use client";

import Link from "@/components/transition/TransitionLink";
import PillButton from "./PillButton";
import PlasmaWave from "@/components/PlasmaWave";

const FOOTER_LINKS = [
  { label: "Services", href: "/services",  external: false },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contacts", href: "/contacts" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ladedesign/",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.39.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71C3.4 8.5 3.4 8.85 3.4 12s0 3.5.07 4.74c.04.9.2 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.39-.2 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.96a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCzestFrXpwSGCfcbO2pObwQ",
    path: "M22.54 7.42c-.25-.94-.99-1.68-1.93-1.93C18.88 5 12 5 12 5s-6.88 0-8.61.49c-.94.25-1.68.99-1.93 1.93C1 9.15 1 12 1 12s0 2.85.46 4.58c.25.94.99 1.68 1.93 1.93C5.12 19 12 19 12 19s6.88 0 8.61-.49c.94-.25 1.68-.99 1.93-1.93C23 14.85 23 12 23 12s0-2.85-.46-4.58ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z",
  },
  {
    name: "GitHub",
    href: "https://github.com/Lade",
    path: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Lade.design/",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z",
  },
];

// Combined CTA + footer. The CTA invites contact over a live PlasmaWave
// background; the footer below holds contact details, navigation, and socials.
export default function CtaFooter() {
  return (
    <footer className="relative bg-ink text-paper">
      {/* CTA */}
      <section className="relative grid place-items-center overflow-hidden text-center md:min-h-[866px] py-32">
        {/* PlasmaWave background, dimmed */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <PlasmaWave />
        </div>

        <div className="relative z-10 mx-auto max-w-[1600px] px-6">
          <h2 className="text-6xl font-light leading-none tracking-tight mix-blend-difference md:text-8xl lg:text-[7.5rem]">
            Have
            <br />
            an idea?
          </h2>
          <div className="mt-8 flex justify-center">
            <PillButton
              href="/contacts"
              label="Tell us"
              variant="paper"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pb-28 md:px-12 lg:px-[7.5rem]">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact blocks */}
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-24">
            <address className="not-italic">
              <div className="mb-6">
                <PillButton
                  href="mailto:info@lade.digital"
                  label="info@lade.digital"
                  variant="paper"
                  size="md"
                />
              </div>
              <span className="mr-2 text-base uppercase opacity-50">
                Office
              </span>
              <span className="text-lg font-medium leading-relaxed">
               Sector 2, Kopar Khairane, Navi Mumbai
              </span>
            </address>
          </div>

          {/* Nav links */}
          <nav className="grid grid-cols-2 gap-x-16 lg:justify-items-end lg:text-right">
            {FOOTER_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="py-3 text-2xl transition-opacity hover:opacity-60"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-2xl transition-opacity hover:opacity-60"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-base hover:opacity-60">
              Privacy Policy
            </Link>
            <span className="text-base opacity-50">2026, Lade</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                title={social.name}
                target="_blank"
                rel="noopener"
                aria-label={social.name}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
