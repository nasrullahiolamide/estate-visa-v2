import { ComponentType, SVGProps } from "react";
import { makePath, PAGES } from "@/packages/libraries";
import {
  AdministratorIcon,
  DashboardIcon,
  EstateIcon,
  GateIcon,
  GroupDiscussionIcon,
  HousesIcon,
  MarketPlaceIcon,
  ServiceRequestIcon,
  TablerMessageIcon,
  UserFriendsIcon,
  UserGroupIcon,
} from "@/svgs";

export type NavLinkType = Array<{
  title: string;
  href: string;
  icon: ({ ...props }: SVGProps<SVGSVGElement>) => JSX.Element;
}>;

export const adminLinks = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  {
    title: "Sub Admins",
    href: makePath(PAGES.DASHBOARD, PAGES.SUB_ADMINS),
    icon: AdministratorIcon,
  },
  {
    title: "Property Owners",
    href: makePath(PAGES.DASHBOARD, PAGES.PROPERTY_OWNERS),
    icon: UserGroupIcon,
  },
  {
    title: "Occupants",
    href: makePath(PAGES.DASHBOARD, PAGES.OCCUPANTS),
    icon: UserFriendsIcon,
  },
  {
    title: "Sub Occupants",
    href: makePath(PAGES.DASHBOARD, PAGES.SUB_OCCUPANTS),
    icon: UserGroupIcon,
  },
  {
    title: "Houses",
    href: makePath(PAGES.DASHBOARD, PAGES.HOUSES),
    icon: HousesIcon,
  },
  {
    title: "Gates",
    href: makePath(PAGES.DASHBOARD, PAGES.GATES),
    icon: GateIcon,
  },
  {
    title: "Messages",
    href: makePath(PAGES.DASHBOARD, PAGES.MESSAGES),
    icon: TablerMessageIcon,
  },
  {
    title: "Meetings",
    href: makePath(PAGES.DASHBOARD, PAGES.MEETINGS),
    icon: GroupDiscussionIcon,
  },
  {
    title: "Service Requests",
    href: makePath(PAGES.DASHBOARD, PAGES.SERVICE_REQUESTS),
    icon: ServiceRequestIcon,
  },
  {
    title: "Market Place",
    href: makePath(PAGES.DASHBOARD, PAGES.MARKET_PLACE),
    icon: MarketPlaceIcon,
  },
];

export const superAdminLinks = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  {
    title: "Estates",
    href: makePath(PAGES.DASHBOARD, PAGES.ESTATES),
    icon: EstateIcon,
  },
];
