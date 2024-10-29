import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api
    .get<OptionsData[]>("/estates/service-types")
    .then(({ data }) => data);
};

const post = function (data: OptionsData) {
  return api.post("/estates/service-types", data);
};

export const service_types = {
  get,
  post,
};
