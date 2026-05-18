"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Sorting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

 
  const currentSort = searchParams.get("sort") || "default";

 
  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    
   
    if (value && value !== "default") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

  
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-50">
      <label 
        htmlFor="price-sort" 
        className="text-xs md:text-sm font-semibold text-gray-700 dark:text-slate-200"
      >
        Sort by Price
      </label>
      <select
        id="price-sort"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="block w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg shadow-xs outline-none border border-transparent focus:border-[#56B6C6] bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 cursor-pointer"
      >
        <option value="default" className="bg-white dark:bg-slate-800">Default</option>
        <option value="low-to-high" className="bg-white dark:bg-slate-800">Low to High</option>
        <option value="high-to-low" className="bg-white dark:bg-slate-800">High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;