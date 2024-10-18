import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type EstateList = {
  total: number;
  data: SubAdminListData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type SubAdminListData = {
  full_name: string;
  phone_number: string;
  last_login: Date;
  status: string;
  created_at: string;
  updated_at: string;
};

export function useFakeSubAdminListData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    full_name: faker.person.fullName(),
    phone_number: faker.phone.number(),
    last_login: faker.date.recent(),
    status: faker.helpers.arrayElement(["Active", "Suspended"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeSubAdminList(): EstateList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeSubAdminListData
  );

  return {
    data,
    page_size: faker.number.int({ min: 5, max: 20 }),
    current_page: faker.number.int({ min: 1, max: 5 }),
    last_page: faker.number.int({ min: 1, max: 5 }),
    total: 20,
    next_page_url: faker.internet.url(),
    prev_page_url: faker.internet.url(),
  };
}
