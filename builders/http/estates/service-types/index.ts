import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api
    .get<OptionsData[]>("/estates/service-types")
    .then(({ data }) => data);
};

const post = function (data: { name: string; description: string }) {
  return api.post("/estates/service-types", data);
};

const remove = function (id: string) {
  return api.delete(`/estates/service-type/${id}`);
};

export const service_types = {
  get,
  post,
  remove,
};
