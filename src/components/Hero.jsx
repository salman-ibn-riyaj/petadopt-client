import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const brandColor = "#56B6C6";
  const lightAccent = "#8ACBD0";

  return (
    <section
      className="relative min-h-[90vh] flex items-center pt-20 pb-12 lg:py-0 overflow-hidden"
      style={{ backgroundColor: brandColor }}
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-black blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1]">
              Find Your New <br />
              <span className="text-cyan-50">Purr-fect</span> Friend
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-cyan-50 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-90">
              Thousands of lovable cats are waiting for a place to call home.
              Start your journey today and change a life forever.
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Link href={'/all-pets'}>
                <Button
                  className="w-full sm:w-auto px-10 py-8 bg-white font-bold text-lg rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                  style={{ color: brandColor }}
                >
                  Adopt Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Responsive Image */}
          <div className="order-1 lg:order-2 relative flex justify-center items-center">
            {/* Soft glow behind cat */}
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] rounded-full opacity-30 blur-2xl animate-pulse"
              style={{ backgroundColor: lightAccent }}
            ></div>

            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[550px] aspect-square">
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
  );
};

export default Hero;
