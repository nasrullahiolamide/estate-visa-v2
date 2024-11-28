import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api
    .get<OptionsData[]>("/estates/service-requests")
    .then(({ data }) => data);
};

const post = function (data: { name: string; description: string }) {
  return api.post("/estates/service-requests", data);
};

const remove = function (id: string) {
  return api.delete(`/estates/service-requests/${id}`);
};

export const service_requests = {
  get,
  post,
  remove,
};
