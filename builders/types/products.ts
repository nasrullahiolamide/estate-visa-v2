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
  owner: {
    id: string;
    name: string;
  };
  reviews: {
    id: string;
    comments: string;
    rating: number;
  }[];
  averageRating: number;
  houseNumber: string;
};

export type UpdateProductData = Omit<
  ProductData,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "estate"
  | "status"
  | "owner"
  | "reviews"
  | "averageRating"
  | "houseNumber"
> & {
  estateId: string;
};

export type ProductStatus =
  | "active"
  | "suspended"
  | "pending-approval"
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
    id: faker.lorem.slug(),
    name: faker.commerce.productName(),
    image: faker.image.url(),
    phone: faker.phone.number(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    price: faker.commerce.price(),
    status: faker.helpers.arrayElement([
      "pending-approval",
      "active",
      "suspended",
      "reported",
    ]),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    estate: fakeEstateData,
    owner: {
      id: faker.lorem.slug(),
      name: faker.person.fullName(),
    },
    reviews: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () => ({
        id: faker.lorem.slug(),
        comments: faker.lorem.sentence(),
        rating: faker.number.float({ min: 0, max: 5 }),
      })
    ),
    averageRating: faker.number.float({ min: 0, max: 5 }),
    houseNumber: faker.location.streetAddress(),
  };
}

export type ReviewProduct = {
  comments: string;
  rating: number;
  productId: string;
};

export function useFakeProductList(): ProductList {
  faker.seed(dayjs().day());

  const data = Array.from(
    { length: faker.number.int({ min: 3, max: 20 }) },
    useFakeProductData
  );

  return {
    data,
    total: 20,
    pageSize: faker.number.int({ min: 5, max: 20 }).toString(),
    page: faker.number.int({ min: 1, max: 5 }).toString(),
  };
}
