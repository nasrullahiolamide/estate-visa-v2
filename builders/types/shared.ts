import { faker } from "@faker-js/faker";
import { MIME_TYPES } from "@mantine/dropzone";

import dayjs from "dayjs";

export type Nullish<Value, Exempt extends keyof Value = never> = {
  [Property in keyof Value]: Property extends Exempt
    ? Value[Property]
    : Value[Property] | null;
};

export type Credentials = {
  passcode?: string;
  username?: string;
};

export function useCredentialsData(_?: any, index?: number) {
  faker.seed(index);

  return {
    username: faker.internet.userName(),
    passcode: faker.internet.password({
      length: faker.number.int({ min: 6, max: 10 }),
      memorable: true,
      pattern: /[a-zA-Z0-9]/,
    }),
  };
}

export type MIME = typeof MIME_TYPES;
export type MIME_TYPE = MIME[keyof MIME];

export type CourseContentTypes = [mime: MIME_TYPE, content_type: ContentType][];
export type ContentType = "Image" | "Video" | "Text" | "File" | "Audio" | "PPT";

export type Thumbnail = {
  id: number;
  file_name: string;
  file_type: string;
  file_url: string;
  file_size: number;
};

export function useThumbnailData(_?: any, index?: number) {
  faker.seed(dayjs().day());
  const id = index ?? faker.number.int({ max: 10 });

  return {
    id,
    file_name: faker.system.fileName(),
    file_type: faker.system.mimeType(),
    file_url: faker.internet.url(),
    file_size: faker.number.int({ min: 1000, max: 10000 }),
  };
}
