"use client";

import {ComboBox, Description, Input, Label, ListBox} from "@heroui/react";

export function FilterInput() {
  return (
    <ComboBox className="w-[256px]">
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
            id="cat" 
            textValue="Cat" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>

          <ListBox.Item 
            id="dog" 
            textValue="Dog" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          
          <ListBox.Item 
            id="panda" 
            textValue="Panda" 
            className="hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            Bird
            <ListBox.ItemIndicator />
          </ListBox.Item>

          <ListBox.Item 
            id="snake" 
            textValue="Snake" 
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