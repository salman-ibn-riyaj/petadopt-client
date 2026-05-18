import {Label, SearchField} from "@heroui/react";

export function SearchInput() {
  return (
    <SearchField name="search">
      <Label className="font-semibold text-slate-700 dark:text-slate-200">
        Search by namme
      </Label>
      <SearchField.Group className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <SearchField.SearchIcon className="text-slate-500 dark:text-slate-400" />
        <SearchField.Input 
          className="w-70 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
          placeholder="Search pets..." 
        />
        <SearchField.ClearButton className="text-slate-500 dark:text-slate-400" />
      </SearchField.Group>
    </SearchField>
  );
}