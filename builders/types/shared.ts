import { faker } from "@faker-js/faker";
import { MIME_TYPES } from "@mantine/dropzone";

import dayjs from "dayjs";
import { string } from "yup";

export type RenameKeys<T, Mappings extends Record<string, string>> = {
  [K in keyof T as K extends keyof Mappings ? Mappings[K] : K]: T[K];
};

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
  asset_id: string;
  bytes: number;
  secure_url: string;
  original_filename: string;
  resource_type: string;
};

export function useThumbnailData(_?: any, index?: number) {
  faker.seed(dayjs().day());
  const id = index ?? faker.number.int({ max: 10 });

  return {
    asset_id: id.toString(),
    original_filename: faker.system.fileName(),
    resource_type: faker.system.mimeType(),
    secure_url: faker.internet.url(),
    bytes: faker.number.int({ min: 1000, max: 10000 }),
  };
}

export function generateHouseNumber(): string {
  const letter = faker.string.alpha(1).toUpperCase();
  const number = faker.string.numeric(2);
  return `${letter}${number}`;
}

export function generateRelationshipStatus(): string {
  return faker.helpers.arrayElement([
    "Friend",
    "Family",
    "Colleague",
    "Neighbor",
    "Relative",
    "Acquaintance",
  ]);
}

export const requiredString = string().required("This is a required field.");

export type OptionsData = {
  id: string;
  name: string;
  description: string;
};
