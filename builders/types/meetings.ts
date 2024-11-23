import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type MeetingList = {
  total: number;
  data: MeetingListData[];
  pageSize: string;
  page: string;
};

export type MeetingListData = {
  id: string;
  title: string;
  date: string;
  time: string;
  minutes: string;
  noOfAttendees: number;
  location: string;
  platform: string;
  meetingLink: string;
  venue: string;
  notes: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type MeetingData = {
  id?: string;
  title: string;
  estateId: string;
  date: Date;
  time: string | null;
  location: string;
  platform: string;
  venue: string;
  meetingLink: string;
  minutes?: string;
  file?: string;
  notes: string;
};

export type MinutesData = {
  minutes: string;
  noOfAttendees: number;
  file: string;
};

export function useFakeMeetingData(_?: any, index?: number): MeetingData {
  faker.seed(index);

  return {
    id: index?.toString(),
    title: faker.word.adjective(),
    estateId: faker.string.uuid(),
    date: faker.date.recent(),
    time: faker.date.recent().toISOString(),
    location: faker.location.city(),
    platform: faker.company.name(),
    venue: faker.location.country(),
    meetingLink: faker.internet.url(),
    minutes: faker.lorem.paragraph(),
    file: faker.system.filePath(),
    notes: faker.lorem.paragraph(),
  };
}

export function useFakeMeetingListData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    title: faker.word.adjective(),
    date: faker.date.recent().toISOString(),
    time: faker.date.recent().toISOString(),
    minutes: faker.lorem.paragraph(),
    noOfAttendees: faker.number.int({ min: 1, max: 100 }),
    location: faker.location.city(),
    platform: faker.company.name(),
    meetingLink: faker.internet.url(),
    venue: faker.location.country(),
    notes: faker.lorem.paragraph(),
    file: faker.system.filePath(),
    status: faker.helpers.arrayElement(["completed"]),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function useFakeMeetingsList(): MeetingList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeMeetingListData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
