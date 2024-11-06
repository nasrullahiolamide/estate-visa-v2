import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber, generateRelationshipStatus } from "./shared";
import { fakeOccupantUser, OccupantUser } from "./occupants";

export type SubOccupantsList = {
  total: number;
  data: SubOccupantsData[];
  pageSize: string;
  page: string;
};

export type SubOccupantsData = {
  id: string;
  relationshipToMain: string;
  user: OccupantUser;
};

export function useFakeSubOccupantsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    user: fakeOccupantUser,
    relationshipToMain: generateRelationshipStatus(),
  };
}

export function useFakeSubOccupantsList(): SubOccupantsList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeSubOccupantsData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
