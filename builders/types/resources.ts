import { faker } from "@faker-js/faker";
import { Thumbnail } from "./shared";

import dayjs from "dayjs";

export type ResourcesList = {
  page_size: number;
  current_page: number;
  last_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  data: Array<ResourceData>;
};

export type ResourceData = {
  id: number;
  course_id: number;
  upload: Thumbnail;
  label: string;
};

export const useFakeResourcesList = () => {
  faker.seed(dayjs().day());

  const data: ResourcesList["data"] = Array.from(
    { length: faker.number.int({ max: 10 }) },
    useFakeResourceData
  );

  return {
    page_size: 10,
    current_page: 1,
    last_page: 1,
    total: 10,
    next_page_url: null,
    prev_page_url: null,
    data,
  };
};

export const useFakeResourceData = (_?: any, index?: number) => {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 10 });

  return {
    id,
    course_id: faker.number.int({ max: 10 }),
    upload: {
      id: faker.number.int({ max: 10 }),
      file_name: faker.system.fileName(),
      file_type: faker.system.mimeType(),
      file_url: faker.internet.url(),
      file_size: faker.number.int({ min: 1000, max: 1000000 }),
    },
    label: faker.lorem.words(),
  };
};
