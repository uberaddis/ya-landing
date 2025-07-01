import About from "./components/About";
import Hero from "./components/Hero";
import How from "./components/How";


export default function Home() {
  return (
    <div className="w-full min-h-screen pt-24 flex flex-col items-center">
      <Hero />
      <How />
      <About />
    </div>
  );
}
