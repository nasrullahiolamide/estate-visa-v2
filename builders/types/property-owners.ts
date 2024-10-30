import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";

export type Occupants = {
  total: number;
  data: PropertyOwnersData[];
  page_size: number;
  current_page: number;
};

export type OccupantsList = {
  total: number;
  data: PropertyOwnersData[];
  pageSize: string;
  page: string;
};

export type PropertyOwnersData = {
  house_no: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export type UpdateProperyOwnerData = {
  email: string;
  fullname: string;
  phone: string;
  houseId: string;
};

export function useFakePropertyOwnersData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    house_no: generateHouseNumber(),
    full_name: faker.person.fullName(),
    email_address: faker.internet.email(),
    phone_number: faker.phone.number(),
    status: faker.helpers.arrayElement(["Active", "Suspended"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakePropertyOwnersList(): OccupantsList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakePropertyOwnersData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
