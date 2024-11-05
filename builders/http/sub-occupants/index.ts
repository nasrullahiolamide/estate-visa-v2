import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { SubOccupantsList } from "@/builders/types/sub-occupants";

const get = function (params?: FilterParams) {
  return api
    .get<SubOccupantsList>("/occupants/sub-occupants/", { params })
    .then((data) => data.data);
};
const download = function () {
  return api
    .get<SubOccupantsList>(`/occupants/sub-occupants/download`)
    .then((data) => data.data);
};

export const sub_occupants = {
  get,
  download,
};
