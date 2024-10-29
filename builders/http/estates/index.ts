import { api } from "@/builders/axios";
import { house_types } from "./house-types";
import { service_types } from "./service-types";
import { interests } from "./interests";
import { UpdateEstateData, EstateList } from "@/builders/types/estates";
import { FilterParams } from "@/builders/types/filter-params";
import { id } from "./id";

const get = function (params?: FilterParams) {
  return api.get<EstateList>("/estates", { params }).then(({ data }) => data);
};

const post = function (data: UpdateEstateData) {
  return api.post("/estates", data);
};

export const estates = {
  id,
  get,
  post,
  house_types,
  service_types,
  interests,
};
