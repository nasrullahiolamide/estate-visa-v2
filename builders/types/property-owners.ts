import { id } from "./../http/sub-admins/id";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateHouseNumber } from "./shared";
import { OccupantUser } from "./occupants";
import { HouseData, useFakeHouseData } from "./houses";

export type PropertyOwnersList = {
  total: number;
  data: PropertyOwnersData[];
  pageSize: string;
  page: string;
};

export type PropertyOwnersData = {
  id: string;
  status: string;
  user: OccupantUser;
  house: HouseData;
};

export type UpdateProperyOwnerData = {
  fullname: string;
  email: string;
  phone: string;
  houseId: string;
};

export function useFakePropertyOwnersData(_?: any, index?: number) {
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
    status: faker.helpers.arrayElement(["Active", "Suspended"]),
    user,
    house,
  };
}

export function useFakePropertyOwnersList(): PropertyOwnersList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakePropertyOwnersData,
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
