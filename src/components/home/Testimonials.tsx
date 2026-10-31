import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person2.png",
  },
  {
    quote:
      '"Kyoto In Autumn Was A Dream Come True. The Temples, The Food, The Warmth Of The People — Everything Was Perfectly Organized From Start To Finish."',
    name: "Emma Williams",
    location: "London, UK",
    image: "/assets/person2.png",
  },
  {
    quote:
      '"The Safari In Tanzania Was Life-Changing. We Saw The Big Five And The Lodges Were Outstanding. This Team Knows How To Craft Real Adventures."',
    name: "David Brown",
    location: "Toronto, Canada",
    image: "/assets/person1.png",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          {/* Header with heading + nav arrows */}
          <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10 sm:gap-6">
            <div>
              <h2 className="text-3xl font-normal tracking-tight text-[#0C0B0B] sm:text-4xl md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-base text-[#6C696D]">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="mt-2 hidden shrink-0 items-center gap-3 sm:flex">
              <CarouselPrevious className="static h-12 w-12 rounded-full border border-[#EEEEEE] text-[#0C0B0B] shadow-none bg-[#EDFCFF] hover:text-[#15A1BF] disabled:opacity-40" />
              <CarouselNext className="static h-12 w-12 rounded-full border border-[#EEEEEE] text-[#0C0B0B] shadow-none bg-[#EDFCFF] hover:text-[#15A1BF] disabled:opacity-40" />
            </div>
          </div>

          <CarouselContent className="-ml-4">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.name}
                className="pl-4 md:basis-1/2 lg:basis-1/2"
              >
                <div className="flex h-full flex-col justify-between gap-5 border border-[#EEEEEE] bg-white p-5 sm:flex-row sm:gap-6 sm:p-8">
                  {/* Quote + author */}
                  <div className="flex flex-1 flex-col">
                    <p className="text-base leading-snug text-[#0C0B0B] sm:text-lg">
                      {item.quote}
                    </p>
                    <div className="mt-auto pt-6 sm:pt-8">
                      <p className="text-base text-[#15A1BF]">
                        — {item.name}
                      </p>
                      <p className="mt-1 text-sm text-[#6C696D]">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Avatar */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={220}
                    height={260}
                    className="h-48 w-full shrink-0 object-cover sm:h-auto sm:w-[220px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
