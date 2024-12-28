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
  email: string;
  phone: string;
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
};

export type SingleEstate = {
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

export function useFakeEstatesData(_?: any, index?: number): EstatesData {
  faker.seed(index);

  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    owner: faker.person.fullName(),
    numberOfHouses: faker.number.int({ min: 10, max: 80 }),
    location: faker.location.country(),
    interests: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.commerce.department(),
    ),
  };
}

export function useFakeSingleEstateData(_?: any, index?: number): SingleEstate {
  faker.seed(index);

  const manager = {
    owner: faker.person.fullName(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
  };

  const admins = Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => ({
      email: faker.internet.email(),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      username: faker.internet.userName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
    }),
  );

  const houseTypes = Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.product(),
    }),
  );

  return {
    name: faker.location.city(),
    location: faker.location.country(),
    owner: faker.person.fullName(),
    phone: faker.phone.number(),
    interests: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.commerce.department(),
    ),
    serviceRequestTypes: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.commerce.product(),
    ),
    numberOfHouses: faker.number.int({ min: 10, max: 80 }),
    manager,
    admins,
    houseTypes,
  };
}

export function useFakeEstateList(): EstateList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 7 }) },
    useFakeEstatesData,
  );

  return {
    data,
    pageSize: faker.number.int({ min: 5, max: 10 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
    total: faker.number.int({ min: 5, max: 10 }),
  };
}
