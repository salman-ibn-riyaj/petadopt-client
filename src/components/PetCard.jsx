"use client";

import { Button } from "@heroui/react";
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const PetCard = ({ feature }) => {
  console.log(feature);
  const { _id } = feature;
  const router = useRouter();


  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="group relative bg-[#EFE3CA]/30 dark:bg-slate-900 rounded-3xl overflow-hidden border border-[#EFE3CA] dark:border-slate-800 transition-all hover:shadow-2xl dark:hover:shadow-cyan-900/20">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-6">
          <h3 className="text-white font-bold text-xl">{feature.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 relative">
        <div className="absolute -top-6 right-8 bg-[#56B6C6] p-3 rounded-full text-white shadow-lg">
          <Quote size={20} />
        </div>
        <p className="text-gray-700 font-bold text-xl dark:text-gray-300 italic leading-relaxed">
          "{feature.species}"
        </p>
        <p className="text-green-700 font-bold text-xl dark:text-gray-300 italic leading-relaxed">
          ${feature.adoptionFee}
        </p>

       
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link href={`/all-pets/${_id}`} className="w-full">
            <Button className="w-full font-bold text-sm sm:text-base" variant="outline">
              View Details
            </Button>
          </Link>

          <Button 
            onClick={() => {
              if (!user) {
                router.push("/login");
              } else {
                router.push(`/all-pets/${_id}`);
              }
            }}
            className="w-full font-bold text-sm sm:text-base bg-[#56B6C6] text-white hover:opacity-90 transition-opacity"
          >
            Adopt Now 🐾
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;