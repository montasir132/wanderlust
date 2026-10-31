import Link from "next/link";
import type { SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";

// Brand icons: lucide-react no longer ships X/LinkedIn/Instagram glyphs.
const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contacts = ["786 901 1622", "info@wandarland.com"];

const socials = [
  { label: "X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0C0B0B] px-4 pt-14 pb-8 text-white sm:px-6 sm:pt-20 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        {/* Brand */}
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
          Wanderlast
        </h2>
        <p className="mt-3 max-w-xl text-sm text-[#B6B6B6] sm:mt-4 sm:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Columns */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          {/* Newsletter */}
          <div>
            <h3 className="text-base tracking-wide text-white uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-[#B6B6B6]">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="mt-5 flex h-12 w-full max-w-[320px] items-center bg-[#373737] pl-4 pr-3">
              <input
                type="email"
                placeholder="Enter email"
                className="h-full flex-1 bg-transparent text-sm text-white placeholder:text-[#B6B6B6] focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-white transition-colors hover:text-[#EDFCFF]"
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base tracking-wide text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#B6B6B6] transition-colors hover:text-[#EDFCFF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base tracking-wide text-white uppercase">
              Support
            </h3>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#B6B6B6] transition-colors hover:text-[#EDFCFF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base tracking-wide text-white uppercase">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] text-[#B6B6B6]">
              {contacts.map((contact) => (
                <li key={contact}>{contact}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-white/15 sm:mt-16" />

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:mt-6 sm:flex-row">
          <p className="text-sm text-[#B6B6B6]">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-white transition-colors hover:text-[#EDFCFF]"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
