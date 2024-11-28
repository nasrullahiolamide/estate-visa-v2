import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api.get<OptionsData[]>("/estates/interests").then(({ data }) => data);
};

const post = function (data: { name: string; description: string }) {
  return api.post("/estates/interests", data);
};

const remove = function (id: string) {
  return api.delete(`/estates/interests/${id}`);
};

export const interests = {
  get,
  post,
  remove,
};
