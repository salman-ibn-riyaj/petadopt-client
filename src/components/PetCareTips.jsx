import React from "react";
import { Apple, HeartPulse, Bath, Moon } from "lucide-react";
import ScrollMotion from "./ScrollMotion";

const tips = [
  {
    id: 1,
    title: "Balanced Diet",
    description:
      "Provide high-quality food appropriate for your pet's age and breed. Fresh water should always be available.",
    icon: <Apple className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Regular Exercise",
    description:
      "Daily walks and playtime keep your pets physically fit and mentally stimulated to prevent boredom.",
    icon: <Moon className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Health Checkups",
    description:
      "Schedule regular vet visits for vaccinations and dental checkups to ensure a long, healthy life.",
    icon: <HeartPulse className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Grooming & Care",
    description:
      "Regular brushing and occasional baths help maintain a healthy coat and reduce shedding around your home.",
    icon: <Bath className="w-6 h-6" />,
  },
];

const PetCareTips = () => {
  return (
    <ScrollMotion>
      <section className="py-16 md:py-24 px-6 transition-colors duration-500 bg-[#EFE3CA] dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          {/* Centered Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Pet Care <span className="text-[#56B6C6]">Tips</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Expert advice to help you provide the best possible life for your
              furry companions.
            </p>
            <div className="w-24 h-1.5 bg-[#56B6C6] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="group p-8 rounded-3xl transition-all duration-300
                         bg-white dark:bg-slate-900 
                         hover:bg-[#56B6C6] dark:hover:bg-[#56B6C6]
                         shadow-sm hover:shadow-xl hover:-translate-y-2"
              >
                {/* Icon Circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
                            bg-[#56B6C6]/10 text-[#56B6C6] 
                            group-hover:bg-white/20 group-hover:text-white"
                >
                  {tip.icon}
                </div>

                <h3
                  className="text-xl font-bold mb-3 transition-colors duration-300
                             text-gray-800 dark:text-white group-hover:text-white"
                >
                  {tip.title}
                </h3>

                <p
                  className="text-sm leading-relaxed transition-colors duration-300
                            text-gray-600 dark:text-gray-400 group-hover:text-cyan-50"
                >
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
};

export default PetCareTips;
