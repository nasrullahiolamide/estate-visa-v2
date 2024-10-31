import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type Messages = {
  total: number;
  data: MessagesData[];
  page_size: number;
  current_page: number;
  last_page: number;
  next_page_url: any;
  prev_page_url: any;
};

export type MessagesData = {
  title: string;
  date: Date;
  time: string;
  attendees: number;
  status: string;
  // meeting_details?: string;
  created_at?: string;
  updated_at?: string;
};

export function useFakeMessagesData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id,
    title: faker.lorem.words(),
    date: faker.date.recent(),
    time: faker.date.recent().toISOString(),
    attendees: faker.number.int({ min: 1, max: 100 }),
    status: faker.helpers.arrayElement(["Completed", "Scheduled", "Cancelled"]),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
  };
}

export function useFakeMessagesList(): Messages {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeMessagesData
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
