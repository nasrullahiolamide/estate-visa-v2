import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type AdminDashboardData = {
  total_active_users: number;
  total_new_signups: number;
  new_signups_percentage_change_week: number;
  new_signups_percentage_change_month: number;
  new_signups_percentage_change_year: number;
  average_course_completion_rate: number;
  user_growth: UserGrowth;
  most_enrolled_courses: MostEnrolledCourses;
  latest_signups: LatestSignup[];
  recent_activities: RecentActivity[];
  average_assessment_engagement: number;
  average_course_rating: number;
  average_latest_assessment_score: number;
};

export type AdminDashboard = {
  data: AdminDashboardData;
};

export type UserGrowth = {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
};

export type MostEnrolledCourses = Record<string, number>;

export type LatestSignup = {
  first_name: string;
  last_name: string;
  email: string;
  staff_id: any;
  department: any;
};

export type RecentActivity = {
  note?: string;
  activity_type: string;
  created_at: string;
  name: string;
};

export type FeedbackData = {
  first_name: string;
  last_name: string;
  rating: number;
  feedback: string;
  feedback_created_at: string;
};

export type Feedback = {
  data: Array<FeedbackData>;
};

export function useFakeFeedbackData() {
  faker.seed(dayjs().day());

  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    feedback: faker.lorem.sentence(),
    feedback_created_at: faker.date.recent().toISOString(),
  };
}

export function useFakeFeedback(): Feedback {
  return {
    data: Array.from(
      { length: faker.number.int({ min: 3, max: 7 }) },
      useFakeFeedbackData,
    ),
  };
}

export function useFakeAdminDashboardData(): AdminDashboardData {
  faker.seed(dayjs().day());

  const user_growth = {
    January: faker.number.int({ min: 100, max: 1000 }),
    February: faker.number.int({ min: 100, max: 1000 }),
    March: faker.number.int({ min: 100, max: 1000 }),
    April: faker.number.int({ min: 100, max: 1000 }),
    May: faker.number.int({ min: 100, max: 1000 }),
    June: faker.number.int({ min: 100, max: 1000 }),
    July: faker.number.int({ min: 100, max: 1000 }),
    August: faker.number.int({ min: 100, max: 1000 }),
    September: faker.number.int({ min: 100, max: 1000 }),
    October: faker.number.int({ min: 100, max: 1000 }),
    November: faker.number.int({ min: 100, max: 1000 }),
    December: faker.number.int({ min: 100, max: 1000 }),
  };

  const most_enrolled_courses = Object.fromEntries(
    Array.from(
      {
        length: faker.number.int({ min: 2, max: 3 }),
      },
      () => [
        faker.lorem.words({
          min: 1,
          max: 2,
        }),
        faker.number.int({ min: 100, max: 1000 }),
      ],
    ),
  );

  const latest_signups = Array.from(
    {
      length: faker.number.int({ min: 1, max: 10 }),
    },
    () => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      staff_id: faker.string.uuid(),
      department: faker.commerce.department(),
    }),
  );

  const recent_activities = Array.from(
    {
      length: faker.number.int({ min: 1, max: 10 }),
    },
    () => ({
      note: faker.lorem.sentence(),
      activity_type: faker.hacker.verb(),
      created_at: faker.date.recent().toISOString(),
      name: faker.person.fullName(),
    }),
  );

  return {
    total_active_users: faker.number.int({ min: 500, max: 1000 }),
    total_new_signups: faker.number.int({ min: 50, max: 100 }),
    new_signups_percentage_change_week: faker.number.float({
      min: -100,
      max: 100,
      fractionDigits: 2,
    }),
    new_signups_percentage_change_month: faker.number.float({
      min: -100,
      max: 100,
      fractionDigits: 2,
    }),
    new_signups_percentage_change_year: faker.number.float({
      min: -100,
      max: 100,
      fractionDigits: 2,
    }),
    average_course_completion_rate: faker.number.float({
      min: 0,
      max: 100,
      fractionDigits: 2,
    }),
    user_growth,
    most_enrolled_courses,
    latest_signups,
    recent_activities,
    average_assessment_engagement: faker.number.float({
      min: 0,
      max: 100,
      fractionDigits: 2,
    }),
    average_course_rating: faker.number.float({
      min: 0,
      max: 5,
      fractionDigits: 2,
    }),
    average_latest_assessment_score: faker.number.float({
      min: 0,
      max: 100,
      fractionDigits: 2,
    }),
  };
}
