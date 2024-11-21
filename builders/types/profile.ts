import { faker } from "@faker-js/faker";
import { User } from "./login";
import { Nullish } from "./shared";

export type ProfileData = User;

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

export type UpdateProfileData = Partial<{
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  estatename: string;
  picture: string;
}>;

export function useFakeProfileData(_?: any, index?: number) {
  faker.seed(index);

  return {
    fullname: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
    picture: faker.image.avatar(),
  };
}
