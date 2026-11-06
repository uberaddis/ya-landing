import About from "./components/About";
import AppDownload from "./components/AppDownload";
import ContactCards from "./components/ContactCards";
import ContactForm from "./components/ContactForm";
import Hero from "./components/Hero";
import How from "./components/How";
import Map from "./components/Map";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Marquee from "./components/Marquee";
import StreetBanner from "./components/StreetBanner";


export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Hero />
      <Marquee />
      <StreetBanner />
      <How />
      <About />
      <Services />
      <AppDownload />
      <Testimonials />
      <ContactForm />
      <ContactCards />
      <Map />
    </div>
  );
}
