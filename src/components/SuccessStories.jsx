import Image from "next/image";
import { Quote } from "lucide-react";
import ScrollMotion from "./ScrollMotion";

const stories = [
  {
    id: 1,
    owner: "Jakir with pet Duke",
    story:
      "Denil has completely changed our lives. From a shy shelter cat to the queen of our hearts, adoption was the best decision ever!",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000",
  },
  {
    id: 2,
    owner: "Shakib with pet Naila",
    story:
      "Milo's energy is infectious! He fits right in with our family. PetAdopt made the process so smooth and transparent.",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000",
  },
  {
    id: 3,
    owner: "Nayeem with pet Luna",
    story:
      "We were looking for a companion for our son, and we found a best friend. Seeing them grow together is pure joy.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000",
  },
];

const SuccessStories = () => {
  return (
    <ScrollMotion>
      <section className="py-16 md:py-24 px-6 transition-colors duration-500 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Our Success Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real stories from people who found their perfect companions
              through PetAdopt.
            </p>
            <div className="w-20 h-1.5 bg-[#56B6C6] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stories.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#EFE3CA]/30 dark:bg-slate-900 rounded-3xl overflow-hidden border border-[#EFE3CA] dark:border-slate-800 transition-all hover:shadow-2xl dark:hover:shadow-cyan-900/20"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.owner}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white font-bold text-xl">
                      {item.owner}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <div className="absolute -top-6 right-8 bg-[#56B6C6] p-3 rounded-full text-white shadow-lg">
                    <Quote size={20} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "{item.story}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
};

export default SuccessStories;
