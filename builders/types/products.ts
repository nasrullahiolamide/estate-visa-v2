import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Estate, fakeEstateData } from "./login";

export type ProductList = {
  total: number;
  data: ProductData[];
  pageSize: string;
  page: string;
};

export type ProductData = {
  id: string;
  name: string;
  image: string;
  phone: string;
  description: string;
  category: string;
  status: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  estate: Estate;
};

export type UpdateProductData = Omit<
  ProductData,
  "id" | "createdAt" | "updatedAt" | "estate" | "status"
> & {
  estateId: string;
};

export type ProductStatus =
  | "active"
  | "suspended"
  | "pending-approval"
  | "approved"
  | "suspended"
  | "reported"
  | "all"
  | string;

export const categories = [
  "Art & Handicrafts",
  "Beauty & Personal Care",
  "Books & Stationery",
  "Cars & Bicycles",
  "Clothing & Accessories",
  "Electronics & Appliances",
  "Furniture & Home Decor",
  "Garden & Plants",
  "Jewelry & Watches",
  "Kitchen & Dining",
  "Toys & Games",
];

export function useFakeProductData(_?: any, index?: number) {
  faker.seed(index);

  return {
    id: Math.random().toString(36),
    name: faker.commerce.productName(),
    image: faker.image.url(),
    phone: faker.phone.number(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    price: faker.commerce.price(),
    status: faker.helpers.arrayElement([
      "pending-approval",
      "approved",
      "suspended",
      "reported",
    ]),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    estate: fakeEstateData,
  };
}

export function useFakeProductList(): ProductList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 20 }) },
    useFakeProductData,
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
