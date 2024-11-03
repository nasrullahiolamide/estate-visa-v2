import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { OccupantList, UpdateOccupantData } from "@/builders/types/occupants";
import { id } from "./id";

const get = function (params?: FilterParams) {
  return api
    .get<OccupantList>("/occupants", { params })
    .then((data) => data.data);
};

const post = function (data: UpdateOccupantData) {
  return api.post("/occupants", data);
};

export const occupants = {
  id,
  get,
  post,
};
