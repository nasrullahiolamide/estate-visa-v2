import { es, faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { EstatesData, useFakeEstatesData } from "./estates";
import { HouseData, useFakeHouseData } from "./houses";
import { useFakeUserData, User } from "./login";

export type MessagesList = {
  page: string;
  pageSize: string;
  total: number;
  messages: MessagesData[];
};

export type UpdateMessagesData = {
  subject?: string;
  content: string;
  title?: string;
  houseIds?: string[];
  estateId?: string;
  attachments?: string[];
};

export interface MessagesData {
  id: string;
  subject: string;
  type: string;
  tag: string;
  content: string;
  attachments: string[];
  responses: MessagesData[];
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  estate: EstatesData;
  house: HouseData;
  sender: User;
  localDate: string;
  localTime: string;
}

export function useFakeMessagesData(_?: any, index?: number) {
  faker.seed(index);

  const estate = useFakeEstatesData();
  const house = useFakeHouseData();
  const sender = useFakeUserData();

  const message: MessagesData = {
    id: faker.string.uuid(),
    subject: faker.lorem.words(),
    type: faker.helpers.arrayElement(["broadcast", "occupant"]),
    content: faker.lorem.paragraphs(4),
    attachments: faker.helpers.arrayElements(["kl", "l"]),
    tag: faker.helpers.arrayElement(["sent", "inbox"]),
    isRead: faker.helpers.arrayElement([true, false]),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    localDate: dayjs().format("MM/DD/YYYY"),
    localTime: dayjs().format("HH:mm A"),
    estate,
    sender,
    house,
    responses: [],
  };

  return message;
}

export function useFakeMessagesList(): MessagesList {
  faker.seed(dayjs().day());

  const messages = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeMessagesData
  );

  return {
    messages,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
