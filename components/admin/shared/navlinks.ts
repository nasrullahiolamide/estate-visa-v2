import { PAGES } from "@/packages/libraries";
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

export const adminLinks = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  { title: "Sub Admins", href: PAGES.SUB_ADMINS, icon: AdministratorIcon },
  {
    title: "Property Owners",
    href: PAGES.PROPERTY_OWNERS,
    icon: UserGroupIcon,
  },
  { title: "Occupants", href: PAGES.OCCUPANTS, icon: UserFriendsIcon },
  { title: "Sub Occupants", href: PAGES.SUB_OCCUPANTS, icon: UserGroupIcon },
  { title: "Houses", href: PAGES.HOUSES, icon: HousesIcon },
  { title: "Gates", href: PAGES.GATES, icon: GateIcon },
  { title: "Messages", href: PAGES.MESSAGES, icon: TablerMessageIcon },
  { title: "Meetings", href: PAGES.MEETINGS, icon: GroupDiscussionIcon },
  {
    title: "Service Requests",
    href: PAGES.SERVICE_REQUESTS,
    icon: ServiceRequestIcon,
  },
  {
    title: "Market Place",
    href: PAGES.MARKET_PLACE,
    icon: MarketPlaceIcon,
  },
];

export const superAdminLinks = [
  { title: "Overview", href: PAGES.DASHBOARD, icon: DashboardIcon },
  { title: "Estates", href: PAGES.ESTATES, icon: EstateIcon },
];
