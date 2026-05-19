import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "./ScrollMotion";

const Hero = () => {
  return (
    <ScrollMotion>
      <section
        className="relative min-h-[90vh] flex items-center pt-20 pb-12 lg:py-0 overflow-hidden transition-colors duration-500
                 bg-[#56B6C6] dark:bg-slate-950"
      >
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white dark:bg-[#8ACBD0] blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-black dark:bg-[#56B6C6] blur-3xl opacity-20" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] transition-colors
                           text-white dark:text-[#8ACBD0]"
              >
                Find Your New <br />
                <span className="text-cyan-50 dark:text-white">
                  Purr-fect
                </span>{" "}
                Friend
              </h1>

              <p
                className="text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-90 transition-colors
                          text-cyan-50 dark:text-gray-300"
              >
                Thousands of lovable cats are waiting for a place to call home.
                Start your journey today and change a life forever.
              </p>

              <div className="pt-4 flex justify-center lg:justify-start">
                <Link href={"/all-pets"}>
                  <Button
                    className="w-full sm:w-auto px-10 py-8 font-bold text-lg rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95
                             bg-white text-[#56B6C6] 
                             dark:bg-[#56B6C6] dark:text-white"
                  >
                    Adopt Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative flex justify-center items-center">
              <div
                className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-125 lg:h-125 rounded-full opacity-30 blur-2xl animate-pulse
                         bg-[#8ACBD0] dark:bg-[#56B6C6]/40"
              ></div>

              <div
                className="relative w-full max-w-[
            300px] sm:max-w-100 lg:ma
            x-w-[550px] aspect-square"
              >
                <Image
                  src="https://plus.unsplash.com/premium_photo-1707353402003-effbc48c547d"
                  alt="Adorable cat ready for adoption"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 550px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
};

export default Hero;
