import Hero from "@/components/Hero";
import Programmes from "@/components/Programmes";
import Give from "@/components/Give";
import Fathers from "@/components/FathersSection";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Programmes />
      <Give />
      <Fathers />
    </div>
  );
}
