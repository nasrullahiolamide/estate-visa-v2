import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api
    .get<OptionsData[]>("/estates/house-types")
    .then(({ data }) => data);
};

const post = function (data: OptionsData) {
  return api.post("/estates/house-types"), data;
};

export const house_types = {
  get,
  post,
};
