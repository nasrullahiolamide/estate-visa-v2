import { api } from "@/builders/axios";
import { UpdateEstateData, EstateList } from "@/builders/types/estates";
import { FilterParams } from "@/builders/types/filter-params";
import { id } from "./id";

const get = function (params?: FilterParams) {
  return api
    .get<EstateList>("/property-owners", { params })
    .then(({ data }) => data);
};

const post = function (data: UpdateEstateData) {
  return api.post("/property-owners", data);
};

const download = function () {
  return api.get("/property-owners/download");
};

export const property_owners = {
  id,
  get,
  post,
  download,
};
