import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api
    .get<OptionsData[]>("/estates/house-types")
    .then(({ data }) => data);
};

const post = function (data: { name: string; description: string }) {
  return api.post("/estates/house-types", data);
};

const remove = function (id: string) {
  return api.delete(`/estates/house-type/${id}`);
};

export const house_types = {
  get,
  post,
  remove,
};
