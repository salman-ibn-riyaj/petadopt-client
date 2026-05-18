'use client'
import React from 'react';

const Sorting = ({ onSortChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full md:max-w-xs">
      <label 
        htmlFor="price-sort" 
        className="text-xs md:text-sm font-semibold text-gray-700 dark:text-slate-200"
      >
        Sort by Price
      </label>
      <select
        id="price-sort"
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg shadow-sm outline-none border border-transparent focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-300 cursor-pointer"
      >
        <option value="default" className="bg-white dark:bg-slate-800">Default</option>
        <option value="low-to-high" className="bg-white dark:bg-slate-800">Low to High</option>
        <option value="high-to-low" className="bg-white dark:bg-slate-800">High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;