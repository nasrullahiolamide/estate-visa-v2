import { PAGES } from "../libraries";

export const RELATIONSHIP_OPTIONS = ["Friend", "Family", "Worker"];
export const SERVICE_TYPES = [
  "Residence Management",
  "Access Request",
  "Service Request",
  "Market Place",
];

export const PRODUCT_CATEGORIES = [
  "Art & Handicrafts",
  "Beauty & Personal Care",
  "Books & Stationery",
  "Cars & Bicycles",
  "Clothing & Accessories",
  "Electronics & Appliances",
  "Furniture & Home Decor",
  "Garden & Plants",
  "Jewelry & Watches",
  "Kitchen & Dining",
  "Toys & Games",
];

export enum PRODUCT_VIEW {
  ALL = "total",
  PENDING_APPROVALS = "pending-approvals",
  ACTIVE = "active",
  REPORTED = "reported",
  SUSPENDED = "suspended",
}

export const PAID_FEATURES = [
  {
    name: "Market Place",
    href: PAGES.MARKET_PLACE,
  },
  {
    name: "Service Request",
    href: PAGES.SERVICE_REQUESTS,
  },
];
