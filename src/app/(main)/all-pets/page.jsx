import { FilterInput } from "@/components/FilterInput";
import PetCard from "@/components/PetCard";
import { SearchInput } from "@/components/SearchInput";
import Sorting from "@/components/Sorting";
import { Search } from "lucide-react";


const FeaturedSection = async ({ searchParams }) => {
  
  
  const params = await searchParams; 
  const search = params?.search || "";
  const species = params?.species || "All";
  const sort = params?.sort || "";

 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-pets?search=${search}&species=${species}&sort=${sort}`,
    { cache: "no-store" }
  );
  const featured = await res.json();

  return (
    <section className="py-16 md:py-24 px-6 transition-colors duration-500 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            All Pets Here
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {featured.length} pets are available
          </p>
          <div className="w-20 h-1.5 bg-[#56B6C6] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* filter and search */}
        <div className="my-6 md:my-12 container mx-auto bg-slate-100 dark:bg-slate-900 shadow-md md:shadow-lg p-4 sm:p-6 md:p-8 rounded-xl w-[95%] lg:w-full border border-transparent dark:border-slate-800 transition-colors duration-300">
          <h2 className="flex items-center gap-1.5 mb-6 text-slate-800 dark:text-slate-100">
            <Search className="w-5 h-5" />
            <p className="font-bold text-lg">Filter and search</p>
          </h2>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-5">
            {/* SearchInput Component */}
            <div className="flex-1">
              <SearchInput />
            </div>

            <div className="flex flex-row items-end gap-3 md:gap-5">
              {/* FilterInput Component */}
              <FilterInput />

              {/* Sorting Component */}
              <Sorting />
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        {featured.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium text-lg">
            No pets found matching your filter criteria. 🐾
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((feature) => (
              <PetCard key={feature._id} feature={feature}></PetCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;