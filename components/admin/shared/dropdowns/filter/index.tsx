import { Box, Button, Group, Menu, MenuProps } from "@mantine/core";
import { ArrowDownIcon, FilterIcon } from "@/svgs";
import { ArrowDown3, ArrowRight3 } from "iconsax-react";
import { Fragment } from "react";
import { Branch } from "./branch";

export type FilterData = {
  label: string;
  value: string;
  children?: FilterData;
}[];

interface FilterDropdownProps extends MenuProps {
  data: FilterData | undefined;
  showLabel?: boolean;
}

interface FileIconProps {
  expanded: boolean;
}

function FileIcon({ expanded }: FileIconProps) {
  return expanded ? (
    <ArrowDown3 color='currentColor' size='16' />
  ) : (
    <ArrowRight3 color='currentColor' size='16' />
  );
}

// Main FilterDropdown component that can include nested dropdowns
export function FilterDropdown({
  data,
  showLabel = true,
  ...props
}: FilterDropdownProps) {
  return <Branch data={data} />;
}
// LeafDropdown handles individual items, and if it has children, it renders as a nested dropdown
