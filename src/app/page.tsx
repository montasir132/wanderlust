import Banner from "../components/home/Banner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import FeaturedMyBookings from "@/components/home/featured-myBookings";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      <Banner />
      <FeaturedMyBookings/>
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      
    </div>
  );
}
