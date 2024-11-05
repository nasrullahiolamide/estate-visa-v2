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
  houseNumber: string;
  streetName: string;
  occupantName: string;
  noOfOccupants: number;
  validityPeriod: string;
  houseTypeId: string;
  status: string;
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
    houseNo: faker.location.buildingNumber(),
    houseNumber: faker.location.buildingNumber(),
    streetName: faker.location.street(),
    occupantName: faker.person.fullName(),
    noOfOccupants: faker.number.int({ min: 1, max: 10 }),
    validityPeriod: faker.date.future().toISOString(),
    houseTypeId: id.toString(),
    status: faker.helpers.arrayElement(["active", "suspended"]),
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
