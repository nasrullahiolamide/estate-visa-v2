import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateRelationshipStatus } from "./shared";
import { fakeOccupantUser, OccupantUser } from "./occupants";
import { HouseData, useFakeHouseData } from "./houses";

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
  house: HouseData;
  mainOccupant: OccupantUser;
};

const fakeHouseData = useFakeHouseData();

export function useFakeSubOccupantsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    user: fakeOccupantUser,
    relationshipToMain: generateRelationshipStatus(),
    mainOccupant: fakeOccupantUser,
    house: fakeHouseData,
  };
}

export function useFakeSubOccupantsList(): SubOccupantsList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeSubOccupantsData,
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
