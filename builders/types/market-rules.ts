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
  ruleTitle: string;
  appliedTo: string;
  date: string;
  status: string;
};

export function useFakeMarketRulesData(_?: any, index?: number) {
  faker.seed(index);

  const id = index ?? faker.number.int({ max: 100 });

  return {
    id: id.toString(),
    ruleTitle: faker.lorem.words(),
    appliedTo: faker.helpers.arrayElement([
      "Occupants",
      "Sub-Occupants",
      "All Users",
    ]),
    date: faker.date.recent().toISOString(),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
  };
}

export function useFakeMarketRulesList(): MarketRulesList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 100 }) },
    useFakeMarketRulesData,
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
