import Hero from "./components/Hero";
import How from "./components/How";


export default function Home() {
  return (
    <div className="w-full min-h-[150vh] pt-24 flex flex-col items-center">
      <Hero />
      <How />
    </div>
  );
}
