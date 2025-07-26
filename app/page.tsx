import About from "./components/About";
import AppDownload from "./components/AppDownload";
import ContactCards from "./components/ContactCards";
import ContactForm from "./components/ContactForm";
import Hero from "./components/Hero";
import How from "./components/How";
import Map from "./components/Map";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";


export default function Home() {
  return (
    <div id='home' className="w-full min-h-screen pt-32 flex flex-col items-center">
      <Hero />
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
