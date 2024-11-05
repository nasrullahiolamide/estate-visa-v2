import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { HouseData, useFakeHouseData } from "./houses";

export type OccupantList = {
  total: number;
  data: OccupantsData[];
  pageSize: string;
  page: string;
};

export type OccupantsData = {
  id: string;
  status: string;
  isMain: boolean;
  isPropertyOwner: boolean;
  relationshipToMain: string;
  user: OccupantUser;
  house: HouseData;
  noOfSubOccupants: number;
};

export type UpdateOccupantData = {
  email: string;
  fullname: string;
  phone: string;
  isMain: boolean;
  isPropertyOwner: boolean;
  relationshipToMain: string;
  houseId: string;
};

export type OccupantUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  phone: string;
  picture: string;
  password: string;
  status: string;
  lastLogin: string;
};

export type OccupantMessages = {};

export function useFakeOccupantsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });
  const user = {
    id: id.toString(),
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    fullname: faker.person.fullName(),
    phone: faker.phone.number(),
    picture: faker.image.avatar(),
    password: faker.internet.password(),
    status: faker.helpers.arrayElement(["active", "suspended"]),
    lastLogin: faker.date.recent().toISOString(),
  };

  const house = useFakeHouseData(index);

  return {
    id: id.toString(),
    status: faker.helpers.arrayElement(["active", "suspended"]),
    isMain: faker.helpers.arrayElement([true, false]),
    isPropertyOwner: faker.helpers.arrayElement([true, false]),
    relationshipToMain: faker.helpers.arrayElement([
      "friend",
      "child",
      "sibling",
      "parent",
    ]),
    user,
    house,
    noOfSubOccupants: faker.number.int({ min: 1, max: 10 }),
  };
}

export function useFakeOccupantsList(): OccupantList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeOccupantsData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
