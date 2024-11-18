import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { AddOccupantData } from "@/builders/types/occupants";
import { SubOccupantsList } from "@/builders/types/sub-occupants";

const get = function (params?: FilterParams) {
  return api
    .get<SubOccupantsList>("/occupants/sub-occupants", { params })
    .then((data) => data.data);
};

const edit = function (variables: { id: string; data: AddOccupantData }) {
  const { id, data } = variables;
  return api.put(`/occupants/${id}`, data);
};

const download = function () {
  return api
    .get<SubOccupantsList>(`/occupants/sub-occupants/download`)
    .then((data) => data.data);
};

export const sub_occupants = {
  get,
  edit,
  download,
};
