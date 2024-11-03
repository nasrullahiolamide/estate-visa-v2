import { api } from "@/builders/axios";
import { SubAdminData, UpdateSubAdminData } from "@/builders/types/sub-admins";
import { id } from "./id";
import { HouseData, HousesList } from "@/builders/types/houses";

const table = function () {
  return api.get<HousesList>("/houses").then((data) => data);
};

const all = function (id: string) {
  return api.get<HouseData[]>(`/houses/all/${id}`).then((data) => data.data);
};

export const houses = {
  id,
  list: {
    table,
    all,
  },
};
