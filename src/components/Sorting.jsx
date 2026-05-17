'use client'
import React from 'react';

const Sorting = ({ onSortChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full md:max-w-xs">
      <label 
        htmlFor="price-sort" 
        className="text-xs md:text-sm font-semibold text-gray-700"
      >
        Sort by Price
      </label>
      <select
        id="price-sort"
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg shadow-sm outline-none border border-transparent focus:border-blue-500 bg-white text-gray-500 cursor-pointer"
      >
        <option value="default">Default</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;