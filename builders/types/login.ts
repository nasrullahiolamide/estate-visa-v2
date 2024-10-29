import { USER_TYPE } from "@/packages/libraries";
import { ProfileData } from "./profile";

export const SuperAdmin = USER_TYPE.SUPER_ADMIN;
export const Admin = USER_TYPE.ADMIN;
export const Guest = USER_TYPE.GUEST;
export const Occupant = USER_TYPE.OCCUPANT;
export const SubOccupant = USER_TYPE.SUB_OCCUPANT;
export const PropertyOwner = USER_TYPE.PROPERTY_OWNER;
export const Gateman = USER_TYPE.GATEMAN;

export const formatUserType: Record<PropertyKey, string> = {
  [USER_TYPE.ADMIN]: "Estate Owner",
  [USER_TYPE.SUPER_ADMIN]: "Super Admin",
  [USER_TYPE.OCCUPANT]: "Occupant",
  [USER_TYPE.SUB_OCCUPANT]: "Sub Occupant",
  [USER_TYPE.PROPERTY_OWNER]: "Property Owner",
  [USER_TYPE.GATEMAN]: "Gateman",
};

export const Admins = [
  SuperAdmin,
  Admin,
  Guest,
  Occupant,
  SubOccupant,
  PropertyOwner,
  Gateman,
] as Array<string>;

export type LoginResponseData = {
  access_token: string;
  user: ProfileData;
};

export type LoginResponse = { data: LoginResponseData; message?: string };
