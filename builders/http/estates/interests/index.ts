import { api } from "@/builders/axios";
import { OptionsData } from "@/builders/types/shared";

const get = function () {
  return api.get<OptionsData[]>("/estates/interests").then(({ data }) => data);
};

const post = function (data: OptionsData) {
  return api.post("/estates/interests", data);
};

export const interests = {
  get,
  post,
};
