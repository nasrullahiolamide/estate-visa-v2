import { Box, Button, Group, Menu, MenuProps } from "@mantine/core";
import { ArrowDownIcon, FilterIcon } from "@/svgs";
import { ArrowDown3, ArrowRight3 } from "iconsax-react";
import { Fragment } from "react";
import { Branch } from "./branch";

export type FilterData = {
  label: string;
  children?: FilterData;
}[];

interface FilterDropdownProps extends MenuProps {
  data: FilterData | undefined;
  showLabel?: boolean;
}

export function FilterDropdown({
  data,
  showLabel = true,
  ...props
}: FilterDropdownProps) {
  return <Branch data={data} />;
}
