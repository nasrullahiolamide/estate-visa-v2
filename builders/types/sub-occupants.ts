import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber, generateRelationshipStatus } from "./shared";

export type SubOccupants = {
  total: number;
  data: SubOccupantsData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type SubOccupantsData = {
  house_no: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  occupant: string;
  relationship: string;
  created_at?: string;
  updated_at?: string;
};

export function useFakeSubOccupantsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    house_no: generateHouseNumber(),
    full_name: faker.person.fullName(),
    email_address: faker.internet.email(),
    phone_number: faker.phone.number(),
    occupant: faker.person.fullName(),
    relationship: generateRelationshipStatus(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeSubOccupantsList(): SubOccupants {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeSubOccupantsData
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
