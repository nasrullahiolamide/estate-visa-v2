import { api } from "@/builders/axios";
import {
  AddOccupantData,
  OccupantsData,
  UpdateOccupantData,
} from "@/builders/types/occupants";

const get = function (id: string) {
  return api.get<OccupantsData>(`/occupants/${id}`).then((data) => data);
};

const edit = function (variables: { id: string; data: UpdateOccupantData }) {
  const { id, data } = variables;
  return api.put(`/occupants/${id}`, data);
};

const change_status = function (variables: {
  id: string;
  data: { status: string };
}) {
  const { id, data } = variables;
  return api.put(`/occupants/change-status/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/occupants/${id}`);
};

export const id = {
  get,
  edit,
  change_status,
  remove,
};
