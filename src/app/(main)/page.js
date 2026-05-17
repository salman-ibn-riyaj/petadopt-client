import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";
import { Button } from "@heroui/react";


export default function Home() {
  return (
    <div>
        <Hero></Hero>
        <WhyAdopt></WhyAdopt>
        <SuccessStories></SuccessStories>
    </div>
  );
}
