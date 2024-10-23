import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";

export type Houses = {
  total: number;
  data: HousesData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type HousesData = {
  house_no: string;
  street_name: string;
  occupant_name: string;
  house_type: string;
  occupants: number;
  validity_period: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export function useFakeHousesData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    house_no: generateHouseNumber(),
    street_name: faker.location.street(),
    house_type: faker.helpers.arrayElement(["Flat", "Duplex", "Bungalow"]),
    occupant_name: faker.person.fullName(),
    occupants: faker.number.int({ min: 1, max: 30 }),
    validity_period: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(["Active", "Suspended"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeHousesList(): Houses {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeHousesData
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
