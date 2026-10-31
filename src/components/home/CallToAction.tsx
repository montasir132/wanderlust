import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/CTA.png"
        alt="Aerial view of a plane over a tropical island"
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1280px] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[420px] sm:px-6 sm:py-24">
        <h2 className="text-3xl font-normal tracking-tight text-white sm:text-4xl md:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 max-w-xl text-sm text-white/90 sm:mt-4 sm:text-base md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button className="mt-7 flex items-center gap-3 bg-[#FFFFFF] px-6 py-4 text-xs font-semibold tracking-widest text-[#0C0B0B] uppercase transition-colors hover:bg-[#EDFCFF] sm:mt-10 sm:gap-4 sm:px-10 sm:py-5 sm:text-sm">
          Book Your Trip Today
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
