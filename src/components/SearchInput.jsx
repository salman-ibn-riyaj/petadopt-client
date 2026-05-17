import {Label, SearchField} from "@heroui/react";

export function SearchInput() {
  return (
    <SearchField name="search">
      <Label className="font-semibold">Search by namme</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-70" placeholder="Search pets..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}