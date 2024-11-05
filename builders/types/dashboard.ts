import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type DashboardData = {
  enrolled_courses_count: number;
  completed_courses_count: number;
  last_assessment_score: number;
  assessment_count: number;
  professional_exam_count: number;
};

export type Dashboard = {
  data: DashboardData;
};

export function useFakeDashboardData() {
  faker.seed(dayjs().day());

  return {
    enrolled_courses_count: faker.number.int({
      max: 10,
    }),
    completed_courses_count: faker.number.int({
      max: 10,
    }),
    last_assessment_score: faker.number.int({
      max: 100,
    }),
    assessment_count: faker.number.int({
      max: 10,
    }),
    professional_exam_count: faker.number.int({
      max: 10,
    }),
  } as DashboardData;
}

export function useFakeDashboard() {
  return {
    data: useFakeDashboardData(),
  };
}
