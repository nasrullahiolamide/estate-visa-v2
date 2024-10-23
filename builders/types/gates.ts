import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";

export type Gates = {
  total: number;
  data: GatesData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type GatesData = {
  name: string;
  location: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export function useFakeGatesData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    name: faker.helpers.arrayElement(["Gate A", "Gate B", "Gate C"]),
    location: faker.location.street(),
    status: faker.helpers.arrayElement(["Open", "Close"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeGatesList(): Gates {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeGatesData
  );

  return {
    data,
    total: 20,
    page_size: faker.number.int({ min: 5, max: 20 }),
    current_page: faker.number.int({ min: 1, max: 5 }),
    last_page: faker.number.int({ min: 1, max: 5 }),
    next_page_url: faker.internet.url(),
    prev_page_url: faker.internet.url(),
  };
}
