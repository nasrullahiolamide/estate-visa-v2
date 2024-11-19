import { api } from "@/builders/axios";
import { id } from "./id";
import {
  BulkUpdateHouseData,
  HouseData,
  HousesList,
} from "@/builders/types/houses";
import { FilterParams } from "@/builders/types/filter-params";

const table = function (params?: FilterParams) {
  return api.get<HousesList>("/houses", { params }).then((data) => data.data);
};

const all = function (id: string) {
  return api.get<HouseData[]>(`/houses/all/${id}`).then((data) => data.data);
};

const post = function (data: BulkUpdateHouseData) {
  return api.post("/houses", data);
};

const download = function () {
  return api
    .get<Blob>("/houses/download", { responseType: "blob" })
    .then((data) => data.data);
};

export const houses = {
  id,
  post,
  download,
  list: {
    table,
    all,
  },
};
