import { api } from "@/builders/axios";
import { id } from "./id";
import {
  BulkUpdateHouseData,
  HouseData,
  HousesList,
} from "@/builders/types/houses";

const table = function () {
  return api.get<HousesList>("/houses").then((data) => data);
};

const all = function (id: string) {
  return api.get<HouseData[]>(`/houses/all/${id}`).then((data) => data.data);
};

const post = function (data: BulkUpdateHouseData) {
  return api.post("/houses", data);
};

export const houses = {
  id,
  post,
  list: {
    table,
    all,
  },
};
