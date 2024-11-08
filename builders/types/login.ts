import { USER_TYPE } from "@/packages/libraries";

export const SuperAdmin = USER_TYPE.SUPER_ADMIN;
export const Admin = USER_TYPE.ADMIN;
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
  Occupant,
  // SubOccupant,
  // PropertyOwner,
  // Gateman,
] as Array<string>;

export type LoginResponseData = {
  access_token: string;
  expiresIn: string;
  refresh_token: string;
  user: User;
  occupant: Occupant;
};

export type Estate = {
  id: string;
  name: string;
  location: string;
  owner: string;
  phone: string;
  interests: string[];
  serviceRequestTypes: string[];
  numberOfHouses: number;
};

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  picture: string;
  password: string;
  refreshToken: string;
  status: string;
  lastLogin: string;
  roles: Array<{ name: string }>;
  estate: Estate;
};

export type House = {
  id: string;
  streetName: string;
  houseNumber: string;
  validityPeriod: string;
  status: string;
};

export type Occupant = {
  id: string;
  status: string;
  isMain: boolean;
  isPropertyOwner: boolean;
  relationshipToMain: string;
  house: House;
};

export type LoginResponse = { data: LoginResponseData; message?: string };
