"use client";

import { Label, SearchField } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

   
      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, searchParams]);

  return (
    <SearchField 
      name="search" 
      value={searchTerm} 
      onChange={(value) => setSearchTerm(value)}
      className="w-full" 
    >
      <Label className="font-semibold text-slate-700 dark:text-slate-200">
        Search by name
      </Label>
      <SearchField.Group className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <SearchField.SearchIcon className="text-slate-500 dark:text-slate-400" />
        <SearchField.Input 
          className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
          placeholder="Search pets..." 
        />
        <SearchField.ClearButton className="text-slate-500 dark:text-slate-400" />
      </SearchField.Group>
    </SearchField>
  );
}