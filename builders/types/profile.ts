import { Nullish } from "./shared";

export type ProfileData = {
  id: string;
  roles: Array<{ name: string }>;
  email?: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  username?: string;
  picture?: string;
  password?: string;
  phone?: string;
  estateId?: string;
  houseId?: string;
  estate: Estate;
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

export type SuperAdminUpdateData = Nullish<
  Partial<{
    fullname: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }>
>;

export type AdminUpdateData = Nullish<
  Partial<{
    estatename: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
  }>
>;
