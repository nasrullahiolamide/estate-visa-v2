import { USER_TYPE } from "@/packages/libraries";

export const SuperAdmin = USER_TYPE.SUPER_ADMIN;
export const Admin = USER_TYPE.ADMIN;
export const Guest = USER_TYPE.GUEST;
export const Occupant = USER_TYPE.OCCUPANT;
export const SubOccupant = USER_TYPE.SUB_OCCUPANT;
export const PropertyOwner = USER_TYPE.PROPERTY_OWNER;
export const Gateman = USER_TYPE.GATEMAN;

export type UserType = (typeof Admins)[number];

export const Admins = [
  SuperAdmin,
  Admin,
  Guest,
  Occupant,
  SubOccupant,
  PropertyOwner,
  Gateman,
];

export type LoginResponseData = {
  access_token: string;
  user: {
    id: string;
    roles: Array<{ name: UserType }>;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    picture: string | null;
    password: string;
  };
};

export type LoginResponse = { data: LoginResponseData; message?: string };
