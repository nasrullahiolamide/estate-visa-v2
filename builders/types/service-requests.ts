import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";
import { OccupantsData, useFakeOccupantsData } from "./occupants";

export type ServiceRequestList = {
  total: number;
  data: ServiceRequestsData[];
  pageSize: string;
  page: string;
};

export type ServiceRequestsData = {
  id: string;
  serviceType: string;
  preferredTime: string;
  urgencyLevel: string;
  status: string;
  contractor: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  occupant: OccupantsData;
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
    serviceType: "Cleaning",
    preferredTime: "Morning",
    urgencyLevel: faker.helpers.arrayElement(["Low", "Medium", "High"]),
    status: faker.helpers.arrayElement(["pending", "in-progress", "completed"]),
    contractor: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    deletedAt: faker.date.recent().toISOString(),
    occupant: useFakeOccupantsData(),
  };
}

export function useFakeServiceRequestsList(): ServiceRequestList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeServiceRequestsData,
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
