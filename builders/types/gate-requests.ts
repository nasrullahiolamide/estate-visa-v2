import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useFakeOccupantsData } from "./occupants";

export type GateRequestList = {
  total: number;
  data: GateRequestData[];
  pageSize: string;
  page: string;
};

export type UpdateGateRequestData = {
  guestName: string;
  guestType: string;
  phoneNo: string;
  visitDate: string;
  visitTime: string;
  occupantId: string;
};

export type GateRequestData = {
  id: string;
  guestName: string;
  guestType: string;
  phoneNo: string;
  visitDate: Date | null;
  visitTime: string;
  accessCode: number;
  status: string;
  occupant: Occupant;
  createdAt: string;
  updatedAt: string;
};

type Occupant = {
  id: string;
  status: string;
  isMain: boolean;
  isPropertyOwner: boolean;
  relationshipToMain: string;
};

export function useFakeGateRequestsData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  const occupant = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeOccupantsData
  );

  return {
    id: id.toString(),
    guestName: faker.person.fullName(),
    guestType: faker.helpers.arrayElement(["Visitor", "Delivery"]),
    phoneNo: faker.phone.number(),
    visitDate: faker.date.future(),
    visitTime: faker.date.future().toISOString(),
    accessCode: faker.number.int({ min: 1000, max: 9999 }),
    status: faker.helpers.arrayElement(["pending", "approved", "declined"]),
    occupant: occupant[0],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export const fakeGateData = Array.from(
  { length: faker.number.int({ min: 3, max: 100 }) },
  useFakeGateRequestsData
);

export function useFakeGateRequestList() {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeGateRequestsData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
