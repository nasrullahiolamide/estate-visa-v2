import { makePath, PAGES } from "@/packages/libraries";
import {
  GateIcon,
  HousesIcon,
  UserFriendsIcon,
  UserGroupIcon,
  IconType,
  EstateIcon,
  UserIcon,
} from "@/icons";

export type StatItem = {
  icon: IconType;
  title: string;
  value: number;
  total?: number;
  label: string;
  href?: string;
};

export const stats: StatItem[] = [
  {
    icon: HousesIcon,
    title: "Total Houses",
    value: 140,
    total: 200,
    label: "Manage Houses",
    href: "#",
  },
  {
    icon: UserFriendsIcon,
    title: "Total Occupants",
    value: 120,
    label: "Manage Occupants",
    href: "#",
  },
  {
    icon: UserGroupIcon,
    title: "Total Sub-Occupants",
    value: 100,
    label: "Manage Sub-Occupants",
    href: "#",
  },
  {
    icon: GateIcon,
    title: "Total Gates",
    value: 4,
    label: "Manage Gates",
    href: "#",
  },
];

export const superAdminStats: StatItem[] = [
  {
    icon: EstateIcon,
    title: "Total Estates",
    value: 120,
    label: "Manage Estates",
    href: makePath(PAGES.DASHBOARD, PAGES.ESTATES),
  },
  {
    icon: UserIcon,
    title: "Total Estate Owners",
    value: 120,
    label: "Manage Estate Owners",
    href: makePath(PAGES.DASHBOARD, PAGES.ESTATES),
  },
  {
    icon: UserIcon,
    title: "Total Users",
    value: 100,
    label: "Manage Users",
  },
];
