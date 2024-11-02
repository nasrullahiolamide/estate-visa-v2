import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type SubAdminList = {
  total: number;
  data: SubAdminListData[];
  pageSize: string;
  page: string;
};

export type SubAdminListData = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  fullName: string;
  username: string;
  phone: string;
  picture: string;
  lastLogin: string;
  status: string;
};

export type SubAdminData = {
  email: string;
  fullname: string;
  phone: string;
  estateId: string;
};

export type UpdateSubAdminData = SubAdminData &
  Partial<{
    password: string;
  }>;

export function useFakeSubAdminListData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    fullName: faker.person.fullName(),
    username: faker.person.middleName(),
    phone: faker.phone.number(),
    picture: faker.image.avatar(),
    lastLogin: faker.date.recent().toString(),
    status: faker.helpers.arrayElement(["Active", "Suspended"]),
  };
}

export function useFakeSubAdminList(): SubAdminList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeSubAdminListData
  );

  return {
    data,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
    total: 20,
  };
}
