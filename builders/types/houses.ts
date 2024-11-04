import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type HousesList = {
  total: number;
  data: HouseData[];
  pageSize: string;
  page: string;
};

export type HouseData = {
  id: string;
  streetName: string;
  houseNumber: string;
  validityPeriod: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateHouseData = {
  streetName: string;
  houseNumber: string;
  houseTypeId: string;
  validityPeriod: string;
  status: string;
};

export type BulkUpdateHouseData = {
  houses: UpdateHouseData[];
  estateId: string;
};

export function useFakeHouseData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    streetName: faker.location.street(),
    houseNumber: faker.person.fullName(),
    validityPeriod: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(["active", "suspended"]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function useFakeHousesList(): HousesList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeHouseData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
