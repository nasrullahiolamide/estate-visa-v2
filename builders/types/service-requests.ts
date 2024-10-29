import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";

export type ServiceRequests = {
  total: number;
  data: ServiceRequestsData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type ServiceRequestsData = {
  house_no: string;
  name: string;
  account_type: string;
  phone_number: string;
  service_type: string;
  date: string;
  preferred_time: string;
  urgency_level: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export function useFakeServiceRequestsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    house_no: generateHouseNumber(),
    name: faker.company.name(),
    account_type: faker.internet.email(),
    phone_number: faker.phone.number(),
    service_type: faker.helpers.arrayElement([
      "Cleaning",
      "Electrical",
      "Plumbing",
    ]),
    date: faker.date.future().toISOString(),
    preferred_time: faker.helpers.arrayElement([
      "Morning",
      "Afternoon",
      "Evening",
    ]),
    urgency_level: faker.helpers.arrayElement(["Low", "Medium", "High"]),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(["Pending", "In Progress", "Completed"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeServiceRequestsList(): ServiceRequests {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeServiceRequestsData
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
