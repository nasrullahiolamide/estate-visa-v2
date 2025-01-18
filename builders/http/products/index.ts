import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  ProductList,
  ProductStatus,
  ReviewProduct,
  UpdateProductData,
} from "@/builders/types/products";

const get = function (params?: FilterParams & { estateId: string }) {
  return api
    .get<ProductList>("/products", { params })
    .then((data) => data.data);
};
const post = function (data: UpdateProductData) {
  return api.post("/products", data);
};

const change_status = function ({
  id,
  status,
}: {
  id: string;
  status: Omit<ProductStatus, "all">;
}) {
  return api.put(`/products/change-status/${id}`, { status });
};

const edit = function ({ id, data }: { id: string; data: UpdateProductData }) {
  return api.put(`/products/${id}`, { data });
};

const remove = function (id: string) {
  return api.delete(`/products/${id}`);
};

const listing = function (params: FilterParams) {
  return api
    .get<ProductList>("/products/by-owner", { params })
    .then((data) => data.data);
};

const review = function (data: ReviewProduct) {
  return api.post(`/products/review`, data);
};

export const products = {
  get,
  post,
  edit,
  change_status,
  remove,
  listing,
  review,
};
