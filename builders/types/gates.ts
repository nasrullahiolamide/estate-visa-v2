import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useFakeUserData, User } from "./login";

export type GateList = {
  total: number;
  data: GatesData[];
  pageSize: string;
  page: string;
};

export type UpdateGateData = {
  name: string;
  password: string;
  location: string;
  status: string;
  estateId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GatesData = {
  id: string;
  status: string;
  name: string;
  password: string;
  location: string;
  user: User;
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
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export function useFakeGatesData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  const user = useFakeUserData(undefined, index);

  const estate = {
    id: id.toString(),
    name: faker.company.name(),
    location: faker.location.street(),
    owner: faker.company.name(),
    phone: faker.phone.number(),
    interests: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.lorem.word()
    ),
    serviceRequestTypes: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.lorem.word()
    ),
    numberOfHouses: faker.number.int({ min: 1, max: 100 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    deletedAt: faker.date.recent().toISOString(),
  };

  return {
    id: id?.toString(),
    name: faker.helpers.arrayElement(["Gate A", "Gate B", "Gate C"]),
    password: "password",
    location: faker.location.street(),
    user,
    estate,
    status: faker.helpers.arrayElement(["Open", "Close"]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export const fakeGateData = Array.from(
  { length: faker.number.int({ min: 3, max: 100 }) },
  useFakeGatesData
);

export function useFakeGatesList() {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeGatesData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
