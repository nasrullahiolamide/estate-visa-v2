import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  ProductList,
  ProductStatus,
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
  status: ProductStatus;
}) {
  return api.put(`/products/change-status/${id}`, { status });
};

const remove = function (id: string) {
  return api.delete(`/products/${id}`);
};

export const products = {
  get,
  post,
  change_status,
  remove,
};
