import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type AdminDashboardData = {
  totalHouses: number;
  totalOccupants: number;
  totalGates: number;
  totalSubOccupants: number;
  recentActivityFeed: RecentActivity[];
};

export type AdminDashboard = {
  data: AdminDashboardData;
};

export type RecentActivity = {
  note?: string;
  activity_type: string;
  created_at: string;
  name: string;
};

export function useFakeRecentActivity(): RecentActivity {
  faker.seed(dayjs().day());

  return {
    note: faker.lorem.sentence(),
    activity_type: faker.helpers.arrayElement([
      "Occupant",
      "Property Owner",
      "Sub Occupant",
      "House",
      "Gate",
    ]),
    created_at: faker.date.recent().toISOString(),
    name: faker.person.fullName(),
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
      useFakeRecentActivity
    ),
  };
}
