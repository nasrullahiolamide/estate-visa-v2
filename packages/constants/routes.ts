import { Gateman } from "./../../builders/types/login";
import { makePath, PAGES } from "@/packages/libraries";
import { SVGProps } from "react";
import {
  AdministratorIcon,
  DashboardIcon,
  EstateIcon,
  GateIcon,
  GroupDiscussionIcon,
  HousesIcon,
  ServiceRequestIcon,
  TablerMessageIcon,
  UserFriendsIcon,
  UserGroupIcon,
  AirlineManageGateIcon,
  NoticeBoardIcon,
} from "@/icons";

export const GENERAL_ROUTES = [
  PAGES.WEBSITE,
  PAGES.TALK_TO_US,
  PAGES.LOGOUT,
] as Array<string>;

export type NavLinkType = Array<{
  title: string;
  href: string;
  icon: ({ ...props }: SVGProps<SVGSVGElement>) => JSX.Element;
}>;

export const GATEMAN_ROUTES = [
  {
    title: "Gate Requests",
    href: PAGES.DASHBOARD,
    icon: GroupDiscussionIcon,
  },
];

export const PROPERTY_OWNER_ROUTES = [
  {
    title: "Meetings",
    href: PAGES.DASHBOARD,
    icon: GroupDiscussionIcon,
  },
];

export const SUPER_ADMIN_ROUTES = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  {
    title: "Estates",
    href: PAGES.ESTATES,
    icon: EstateIcon,
  },
];

export const ADMIN_ROUTES = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  {
    title: "Sub Admins",
    href: PAGES.SUB_ADMINS,
    icon: AdministratorIcon,
  },
  {
    title: "Property Owners",
    href: PAGES.PROPERTY_OWNERS,
    icon: UserGroupIcon,
  },
  {
    title: "Occupants",
    href: PAGES.OCCUPANTS,
    icon: UserFriendsIcon,
  },
  {
    title: "Sub Occupants",
    href: PAGES.SUB_OCCUPANTS,
    icon: UserGroupIcon,
  },
  {
    title: "Houses",
    href: PAGES.HOUSES,
    icon: HousesIcon,
  },
  {
    title: "Gates",
    href: PAGES.GATES,
    icon: GateIcon,
  },
  {
    title: "Messages",
    href: PAGES.MESSAGES,
    icon: TablerMessageIcon,
  },
  {
    title: "Meetings",
    href: PAGES.MEETINGS,
    icon: GroupDiscussionIcon,
  },
  {
    title: "Service Requests",
    href: PAGES.SERVICE_REQUESTS,
    icon: ServiceRequestIcon,
  },
  // {
  //   title: "Market Place",
  //   href:  PAGES.MARKET_PLACE,
  //   icon: MarketPlaceIcon,
  // },
];

export const SUB_ADMIN_ROUTES = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },

  {
    title: "Occupants",
    href: PAGES.OCCUPANTS,
    icon: UserFriendsIcon,
  },
  {
    title: "Sub Occupants",
    href: PAGES.SUB_OCCUPANTS,
    icon: UserGroupIcon,
  },
  {
    title: "Houses",
    href: PAGES.HOUSES,
    icon: HousesIcon,
  },
  {
    title: "Gates",
    href: PAGES.GATES,
    icon: GateIcon,
  },
  {
    title: "Messages",
    href: PAGES.MESSAGES,
    icon: TablerMessageIcon,
  },
  {
    title: "Meetings",
    href: PAGES.MEETINGS,
    icon: GroupDiscussionIcon,
  },
  {
    title: "Service Requests",
    href: PAGES.SERVICE_REQUESTS,
    icon: ServiceRequestIcon,
  },
  // {
  //   title: "Market Place",
  //   href:  PAGES.MARKET_PLACE,
  //   icon: MarketPlaceIcon,
  // },
];

export const OCCUPANT_ROUTES = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  {
    title: "Gate Requests",
    href: PAGES.GATE_REQUESTS,
    icon: AirlineManageGateIcon,
  },
  {
    title: "Messages",
    href: PAGES.MESSAGES,
    icon: TablerMessageIcon,
  },
  {
    title: "Notice Board",
    href: PAGES.NOTICE_BOARD,
    icon: NoticeBoardIcon,
  },
  {
    title: "Meetings",
    href: PAGES.MEETINGS,
    icon: GroupDiscussionIcon,
  },
  {
    title: "Sub Occupants",
    href: PAGES.SUB_OCCUPANTS,
    icon: UserGroupIcon,
  },
  {
    title: "Service Requests",
    href: PAGES.SERVICE_REQUESTS,
    icon: ServiceRequestIcon,
  },
  // {
  //   title: "Market Place",
  //   href:  PAGES.MARKET_PLACE,
  //   icon: MarketPlaceIcon,
  // },
];

export const SUB_OCCUPANT_ROUTES = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  {
    title: "Gate Requests",
    href: PAGES.GATE_REQUESTS,
    icon: AirlineManageGateIcon,
  },
  {
    title: "Notice Board",
    href: PAGES.NOTICE_BOARD,
    icon: NoticeBoardIcon,
  },
  {
    title: "Meetings",
    href: PAGES.MEETINGS,
    icon: GroupDiscussionIcon,
  },
  {
    title: "Service Requests",
    href: PAGES.SERVICE_REQUESTS,
    icon: ServiceRequestIcon,
  },
  // {
  //   title: "Market Place",
  //   href:  PAGES.MARKET_PLACE,
  //   icon: MarketPlaceIcon,
  // },
];
