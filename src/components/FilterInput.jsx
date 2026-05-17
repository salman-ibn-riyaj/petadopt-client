"use client";

import {ComboBox, Description, Input, Label, ListBox} from "@heroui/react";

export function FilterInput() {
  return (
    <ComboBox className="w-[256px]">
      <Label className="font-semibold">Filter by species</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Filter by species" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          
          <ListBox.Item id="cat" textValue="Cat">
            Cat
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="Dog">
            Dog
            <ListBox.ItemIndicator />
          </ListBox.Item>
          
          <ListBox.Item id="panda" textValue="Panda">
            Bird
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="Snake">
            Rabbit
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
      
    </ComboBox>
  );
}