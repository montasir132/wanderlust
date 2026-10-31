import Image from "next/image";

const features = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#EDFCFF] my-10 px-4 py-14 sm:my-20 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-base text-[#6C696D]">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-black/5 bg-white p-6 shadow-sm sm:p-9"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <h3 className="mt-6 text-xl font-normal text-[#0C0B0B] sm:mt-7 sm:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6C696D]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
