import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { AddOccupantData, OccupantList } from "@/builders/types/occupants";
import { id } from "./id";

const get = function (params?: FilterParams) {
  return api
    .get<OccupantList>("/occupants", { params })
    .then((data) => data.data);
};

const post = function (data: AddOccupantData) {
  return api.post("/occupants", data);
};

const download = function () {
  return api
    .get<Blob>("/occupants/download", { responseType: "blob" })
    .then((data) => data.data);
};
export const occupants = {
  id,
  get,
  post,
  download,
};
