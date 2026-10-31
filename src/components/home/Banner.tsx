import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/Banner.png"
        alt="Coastal destination"
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Centered content */}
      <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-6 pt-16 pb-14 text-center text-white sm:min-h-[560px] md:min-h-160 md:pb-28">
        <h1 className="max-w-4xl text-4xl font-normal leading-[1.1] tracking-tight drop-shadow-sm sm:text-5xl md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 md:mt-6 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
          <button className="flex items-center gap-3 bg-[#00a2d4] px-6 py-3.5 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-[#008fbd] sm:px-8 sm:py-4 sm:text-sm">
            Explore Now
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="border border-white/40 bg-white/25 px-6 py-3.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35 sm:px-8 sm:py-4 sm:text-sm">
            View Destination
          </button>
        </div>
      </div>

      {/* Search bar: in-flow on mobile, pinned to the bottom on desktop */}
      <div className="relative z-10 border-t border-white/30 bg-white/45 backdrop-blur-sm md:absolute md:inset-x-0 md:bottom-0">
        <div className="mx-auto grid max-w-360 grid-cols-1 sm:grid-cols-2 md:flex">
          {searchFields.map((field, i) => (
            <div
              key={field.label}
              className={[
                "px-5 py-3.5 text-left text-white sm:px-6 sm:py-4 md:flex-1",
                // mobile: divider between stacked rows
                i > 0 ? "border-t border-white/30" : "",
                // sm (2 cols): vertical divider on the right column
                i % 2 === 1 ? "sm:border-l sm:border-t-0 sm:border-white/30" : "",
                // sm: horizontal divider before the second row
                i >= 2 ? "sm:border-t sm:border-white/30" : "sm:border-t-0",
                // md (inline): vertical dividers only
                "md:border-t-0 md:border-l md:border-white/30",
                i === 0 ? "md:border-l-0" : "",
              ].join(" ")}
            >
              <p className="text-base font-semibold sm:text-lg">
                {field.label}
              </p>
              <p className="mt-0.5 text-sm text-white/75">
                {field.placeholder}
              </p>
            </div>
          ))}
          <button className="flex items-center justify-center gap-2 bg-[#15A1BF] px-12 py-4 text-base font-semibold text-white transition-colors hover:bg-[#008fbd] sm:py-5 sm:text-lg md:min-w-45">
            <Search className="h-5 w-5 md:hidden" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
