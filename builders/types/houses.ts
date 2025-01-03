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
  houseType: {
    id: string;
    name: string;
  };
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
    houseNo: faker.location.buildingNumber(),
    houseNumber: faker.location.buildingNumber(),
    streetName: faker.location.street(),
    occupantName: faker.person.fullName(),
    noOfOccupants: faker.number.int({ min: 1, max: 10 }),
    validityPeriod: "4 months",
    houseType: {
      id: id.toString(),
      name: faker.helpers.arrayElement([
        "bungalow",
        "duplex",
        "flat",
        "penthouse",
      ]),
    },
    status: faker.helpers.arrayElement(["active", "suspended"]),
    createdAt: faker.date.recent().toISOString(),
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
