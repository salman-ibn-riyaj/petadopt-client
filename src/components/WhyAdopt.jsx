import React from 'react';
import { Heart, Home, ShieldCheck } from 'lucide-react';

const WhyAdopt = () => {
  
  const reasons = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Save a Life",
      description: "Each year, millions of pets enter shelters. Adoption gives these lovable animals a second chance at a happy life."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Fully Vetted",
      description: "Most shelter pets are already vaccinated, microchipped, and spayed/neutered, making the transition easier for you."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Lifelong Bond",
      description: "Adopted pets often show incredible gratitude. You're not just getting a pet; you're gaining a loyal family member."
    }
  ];

  return (
    <section 
      className="py-16 md:py-24 px-6 transition-colors duration-500 
                 bg-[#EFE3CA] dark:bg-slate-900" 
    >
      
      
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 transition-colors
                         text-gray-800 dark:text-gray-100">
            Why Adopt a Pet?
          </h2>
          <div className="w-20 h-1.5 mx-auto rounded-full bg-[#56B6C6] dark:bg-[#8ACBD0]"></div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl shadow-sm transition-all duration-300 flex flex-col items-center text-center
                         bg-white dark:bg-slate-800 hover:shadow-md dark:hover:bg-slate-750"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white
                            bg-[#56B6C6] dark:bg-[#56B6C6]">
                {reason.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 transition-colors
                             text-gray-800 dark:text-cyan-400">
                {reason.title}
              </h3>
              
              <p className="leading-relaxed transition-colors
                            text-gray-600 dark:text-gray-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <p className="italic text-sm md:text-base transition-colors
                        text-gray-500 dark:text-gray-400">
            "The world would be a nicer place if everyone had the ability to love as unconditionally as a dog."
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;