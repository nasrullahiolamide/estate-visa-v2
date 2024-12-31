import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export type MarketRulesList = {
  total: number;
  data: MarketRulesData[];
  pageSize: string;
  page: string;
};

export type MarketRulesData = {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  estateId: string;
  status: string;
  appliesTo: string;
};

export function useFakeMarketRulesData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    image: faker.image.url(),
    date: faker.date.recent().toISOString(),
    estateId: faker.lorem.sentence(),
    appliesTo: faker.helpers.arrayElement([
      "all",
      "Occupants",
      "Sub-Occupants",
    ]),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
  };
}

export function useFakeMarketRulesList(): MarketRulesList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeMarketRulesData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
