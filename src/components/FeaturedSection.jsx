import Image from "next/image";
import { Quote } from "lucide-react";
import PetCard from "./PetCard";
import Link from "next/link";
import { Button } from "@heroui/react";
import ScrollMotion from "./ScrollMotion";

const FeaturedSection = async () => {
  // featured data fetching
  const res = await fetch("http://localhost:5001/featured");
  const featured = await res.json();
  console.log(featured);

  return (
    <ScrollMotion>
      <section className="py-16 md:py-24 px-6 transition-colors duration-500 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Our Featured Pets
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet the lovable companions currently looking for their forever
              homes. Each of these furry friends is vetted, socialized, and
              waiting to start a new chapter with you.
            </p>
            <div className="w-20 h-1.5 bg-[#56B6C6] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((feature) => (
              <PetCard key={feature._id} feature={feature}></PetCard>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link href={"/all-pets"}>
            <Button
              size="lg"
              className={"border-2 bg-accent-hover"}
              variant="accent"
            >
              View All Pets
            </Button>
          </Link>
        </div>
      </section>
    </ScrollMotion>
  );
};

export default FeaturedSection;
