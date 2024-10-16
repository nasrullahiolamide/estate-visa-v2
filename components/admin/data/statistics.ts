import { PAGES } from "@/packages/libraries";
import {
  GateIcon,
  HousesIcon,
  UserFriendsIcon,
  UserGroupIcon,
  IconType,
  EstateIcon,
  UserIcon,
} from "@/svgs";

export type StatItem = {
  icon: IconType;
  title: string;
  value: number;
  total?: number;
  label: string;
  href: string;
};

export const stats: StatItem[] = [
  {
    icon: HousesIcon,
    title: "Total Houses",
    value: 140,
    total: 200,
    label: "Manage Houses",
    href: PAGES.HOUSES,
  },
  {
    icon: UserFriendsIcon,
    title: "Total Occupants",
    value: 120,
    label: "Manage Occupants",
    href: PAGES.OCCUPANTS,
  },
  {
    icon: UserGroupIcon,
    title: "Total Sub-Occupants",
    value: 100,
    label: "Manage Sub-Occupants",
    href: PAGES.SUB_OCCUPANTS,
  },
  {
    icon: GateIcon,
    title: "Total Gates",
    value: 4,
    label: "Manage Gates",
    href: PAGES.GATES,
  },
];

export const superAdminStats: StatItem[] = [
  {
    icon: EstateIcon,
    title: "Total Estates",
    value: 120,
    label: "Manage Estates",
    href: PAGES.ESTATES,
  },
  {
    icon: UserIcon,
    title: "Total Estate Owners",
    value: 120,
    label: "Manage Estate Owners",
    href: PAGES.OCCUPANTS,
  },
  {
    icon: UserIcon,
    title: "Total Users",
    value: 100,
    label: "Manage Users",
    href: PAGES.OCCUPANTS,
  },
];
