"use client";

import { ComboBox, Input, Label, ListBox } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

 
  const currentSpecies = searchParams.get("species") || "All";

 
  const handleSelectionChange = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    
  
    if (key && key !== "All") {
      params.set("species", key);
    } else {
      params.delete("species");
    }

   
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ComboBox 
      className="w-full sm:w-[256px]"
      selectedKey={currentSpecies}
      onSelectionChange={handleSelectionChange}
    >
      <Label className="font-semibold text-slate-700 dark:text-slate-200">
        Filter by species
      </Label>
      <ComboBox.InputGroup className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg">
        <Input 
          className="bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
          placeholder="Filter by species" 
        />
        <ComboBox.Trigger className="text-slate-500 dark:text-slate-400" />
      </ComboBox.InputGroup>
      
      <ComboBox.Popover className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <ListBox className="text-slate-900 dark:text-slate-100">
          
        
          <ListBox.Item 
            id="All" 
            textValue="All Species" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            All Species
            <ListBox.ItemIndicator />
          </ListBox.Item>

          <ListBox.Item 
            id="Cat" 
            textValue="Cat" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>

          <ListBox.Item 
            id="Dog" 
            textValue="Dog" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          
       
          <ListBox.Item 
            id="Bird" 
            textValue="Bird" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Bird
            <ListBox.ItemIndicator />
          </ListBox.Item>

        
          <ListBox.Item 
            id="Rabbit" 
            textValue="Rabbit" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Rabbit
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}