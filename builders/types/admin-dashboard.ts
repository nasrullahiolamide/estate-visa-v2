import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type AdminDashboardData = {
  totalHouses: number;
  totalOccupants: number;
  totalGates: number;
  totalSubOccupants: number;
  recentActivityFeed: RecentActivityFeed[];
};

export type RecentActivityFeed = {
  id: string;
  action: string;
  timestamp: string;
  details: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type AccessRequestData = {
  totalRequests: number;
  approvedPercentage: number;
  pendingPercentage: number;
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

export function useFakeAccessRequestData(): AccessRequestData {
  faker.seed(dayjs().day());

  return {
    totalRequests: faker.number.int({ min: 1, max: 100 }),
    approvedPercentage: faker.number.int({ min: 1, max: 100 }),
    pendingPercentage: faker.number.int({ min: 1, max: 100 }),
  };
}

export function useFakeRecentActivityFeedData() {
  faker.seed(dayjs().day());

  return {
    id: faker.number.int({ max: 100 }).toString(),
    action: faker.helpers.arrayElement([
      "created",
      "updated",
      "deleted",
      "added",
    ]),
    timestamp: faker.date.recent().toISOString(),
    details: faker.lorem.sentence(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    deletedAt: faker.date.recent().toISOString(),
  };
}

export function useFakeAdminDashboardData(): AdminDashboardData {
  faker.seed(dayjs().day());

  return {
    totalHouses: faker.number.int({ min: 1, max: 100 }),
    totalOccupants: faker.number.int({ min: 1, max: 100 }),
    totalGates: faker.number.int({ min: 1, max: 100 }),
    totalSubOccupants: faker.number.int({ min: 1, max: 100 }),
    recentActivityFeed: Array.from(
      { length: faker.number.int({ min: 3, max: 100 }) },
      useFakeRecentActivityFeedData
    ),
  };
}
