import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type SuperAdminDashboardData = {
  totalEstates: number;
  totalEstateOwners: number;
  totalUsers: number;
  onboardingRates: OnboardingRates;
  userPercentage: UserPercentage;
  recentActivityFeed: Array<RecentActivityFeed>;
};

export type SuperAdminDashboard = {
  data: SuperAdminDashboardData;
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

export type UserPercentage = {
  totalUsers: number;
  estateOwnersPercentage: number;
  occupantsPercentage: number;
  subOccupantsPercentage: number;
};

export type OnboardingRates = {
  timeFilter: string;
  managersOnboarded: number;
  nonManagersOnboarded: number;
};

export function useFakeRecentActivityFeedData() {
  faker.seed(dayjs().day());

  return {
    id: "faker",
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

export function useFakeSuperAdminDashboardData(): SuperAdminDashboardData {
  faker.seed(dayjs().day());

  return {
    totalEstates: faker.number.int({ min: 10, max: 100 }),
    totalEstateOwners: faker.number.int({ min: 10, max: 100 }),
    totalUsers: faker.number.int({ min: 10, max: 100 }),
    onboardingRates: {
      timeFilter: faker.date.recent().toISOString(),
      managersOnboarded: faker.number.int({ min: 10, max: 100 }),
      nonManagersOnboarded: faker.number.int({ min: 10, max: 100 }),
    },
    userPercentage: {
      totalUsers: faker.number.int({ min: 10, max: 100 }),
      estateOwnersPercentage: faker.number.int({ min: 10, max: 100 }),
      occupantsPercentage: faker.number.int({ min: 10, max: 100 }),
      subOccupantsPercentage: faker.number.int({ min: 10, max: 100 }),
    },
    recentActivityFeed: Array.from(
      { length: faker.number.int({ min: 3, max: 7 }) },
      useFakeRecentActivityFeedData
    ),
  };
}
