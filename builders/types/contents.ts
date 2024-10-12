import { faker } from "@faker-js/faker";
import { ContentType } from "./shared";

import dayjs from "dayjs";

export type Content = "Text" | "Resource";

export type CreateContent = {
  chapter_id: number;
  order: number;
  title: string;
  content_data: string | null;
  content_type: string;
  upload_id: number;
};

export type ContentsList = {
  data: Array<ContentsData>;
  page_size: number;
  current_page: number;
  last_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type ContentsData = {
  id: number;
  order: number;
  title: string;
  chapter_id: number;
  is_completed: boolean;
  upload?: {
    id: number;
    file_name: string;
    file_type: string;
    file_url: string;
    file_size: number;
    duration: string | null;
  };
  content_type: ContentType;
  content_data: string;
  duration_in_seconds: number;
};

export function useFakeContentsData(_: any, index: number) {
  faker.seed(index);

  return {
    id: index,
    order: faker.number.int({
      max: 10,
    }),
    title: faker.lorem.words(3),
    chapter_id: faker.number.int({
      max: 10,
    }),
    is_completed: faker.datatype.boolean(),
    content_type: faker.helpers.arrayElement([
      "Image",
      "Video",
      "Text",
      "File",
      "Audio",
      "PPT",
    ]),
    content_data: faker.internet.url(),
    upload: {
      id: faker.number.int({
        max: 10,
      }),
      file_name: faker.system.fileName(),
      file_type: faker.system.fileType(),
      file_url: faker.internet.url(),
      file_size: faker.number.int({
        max: 100000,
      }),
      duration: faker.date.recent(),
    },
  };
}

export function useFakeContentsList() {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ max: 10 }) },
    useFakeContentsData
  );

  return {
    data,
    page_size: faker.number.int({ min: 5, max: 10 }),
    current_page: faker.number.int({ min: 1, max: 5 }),
    last_page: faker.number.int({ min: 1, max: 5 }),
    total: faker.number.int({ min: 5, max: 10 }),
    next_page_url: faker.internet.url(),
    prev_page_url: faker.internet.url(),
  };
}
