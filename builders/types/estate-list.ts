import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type EstateList = {
  total: number;
  data: EstateListData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type EstateListData = {
  estate_name: string;
  owner: string;
  no_of_houses: number;
  location: string;
  interest?: string;
  created_at: string;
  updated_at: string;
};

export function useFakeEstateListData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 10 });

  return {
    id,
    estate_name: faker.location.city(),
    owner: faker.person.fullName(),
    no_of_houses: faker.number.int(),
    location: faker.location.country(),
    interest: faker.commerce.department(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeStaffList(): EstateList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 7 }) },
    useFakeEstateListData
  );

  return {
    data,
    page_size: faker.number.int({ min: 5, max: 10 }),
    current_page: faker.number.int({ min: 1, max: 5 }),
    last_page: faker.number.int({ min: 1, max: 5 }),
    total: faker.number.int({ min: 5, max: 10 }),
    next_page_url: faker.internet.url(),
    prev_page_url: faker.internet.url(),
  };
}
