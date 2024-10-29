import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { OptionsData } from "./shared";

export type UpdateEstateData = {
  name: string;
  location: string;
  numberOfHouses: number;
  managerDetails: ManagerDetails;
  houseTypes: string[];
  interests: string[];
  serviceRequestTypes: string[];
};

export type ManagerDetails = {
  owner: string;
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type EstateList = {
  total: number;
  data: EstatesData[];
  pageSize: string;
  page: string;
};

export type EstatesData = {
  id: string;
  name: string;
  username?: string;
  location: string;
  owner: string;
  email?: string;
  password?: string;
  interests: string[];
  phone?: string;
  serviceRequestTypes?: string[];
  numberOfHouses?: number;
  houseTypes?: string[];
  created_at?: string;
  updated_at?: string;
  deletedAt?: string;
};

export type Estate = {
  name: string;
  location: string;
  owner: string;
  phone: string;
  interests: string[];
  serviceRequestTypes: string[];
  numberOfHouses: number;
  manager: ManagerDetails;
  admins: Admin[];
  houseTypes: OptionsData[];
};

export type Admin = {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  password: string;
};

export function useFakeEstateData(_?: any, index?: number) {
  faker.seed(index);

  const id = index?.toString() ?? faker.number.int({ max: 10 }).toString();

  return {
    id,
    name: faker.location.city(),
    owner: faker.person.fullName(),
    numberOfHouses: faker.number.int({ min: 10, max: 80 }),
    location: faker.location.country(),
    interests: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.commerce.department()
    ),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeEstateList(): EstateList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 7 }) },
    useFakeEstateData
  );

  return {
    data,
    pageSize: faker.number.int({ min: 5, max: 10 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
    total: faker.number.int({ min: 5, max: 10 }),
  };
}
