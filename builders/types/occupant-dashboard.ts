import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { HouseData, useFakeHouseData } from "./houses";

export type OccupantDashboard = {
  totalGateRequests: number;
  totalServiceRequests: number;
  totalMessages: number;
  totalSubOccupants: number;
  house: HouseData;
};

export type ServiceRequestData = {
  day: string;
  approved: number;
  rejected: number;
  pending: number;
}[];

export function useFakeServiceRequesData(): ServiceRequestData {
  faker.seed(dayjs().day());

  return Array.from({ length: faker.number.int({ min: 3, max: 100 }) }, () => ({
    day: faker.date.recent().toISOString(),
    approved: faker.number.int({ min: 1, max: 100 }),
    rejected: faker.number.int({ min: 1, max: 100 }),
    pending: faker.number.int({ min: 1, max: 100 }),
  }));
}

export function useFakeOccupantDashboard(): OccupantDashboard {
  faker.seed(dayjs().day());

  return {
    totalGateRequests: faker.number.int({ min: 1, max: 100 }),
    totalServiceRequests: faker.number.int({ min: 1, max: 100 }),
    totalMessages: faker.number.int({ min: 1, max: 100 }),
    totalSubOccupants: faker.number.int({ min: 1, max: 100 }),
    house: useFakeHouseData(),
  };
}
