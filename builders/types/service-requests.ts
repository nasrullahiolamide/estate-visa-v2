import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";

export type ServiceRequestList = {
  total: number;
  data: ServiceRequestsData[];
  pageSize: string;
  page: string;
};

export type ServiceRequestsData = {
  id: string;
  houseNo: string;
  name: string;
  accountType: string;
  phone: string;
  serviceType: string;
  preferredTime: string;
  urgencyLevel: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateServiceRequestsData = {
  serviceType: string;
  preferredTime: string;
  urgencyLevel: string;
  description: string;
  image?: string;
  status?: string;
  occupantId?: string;
};

export function useFakeServiceRequestsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    houseNo: generateHouseNumber(),
    name: faker.company.name(),
    accountType: faker.internet.email(),
    phone: faker.phone.number(),
    serviceType: "Cleaning",
    preferredTime: "Morning",
    urgencyLevel: faker.helpers.arrayElement(["Low", "Medium", "High"]),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(["Pending", "In Progress", "Completed"]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function useFakeServiceRequestsList(): ServiceRequestList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeServiceRequestsData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
