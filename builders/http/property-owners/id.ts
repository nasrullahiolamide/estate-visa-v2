import { api } from "@/builders/axios";
import { Estate, UpdateEstateData } from "@/builders/types/estates";
import { OccupantsData, UpdateOccupantData } from "@/builders/types/occupants";
import { UpdateProperyOwnerData } from "@/builders/types/property-owners";

const get = function (id: string) {
  return api.get<OccupantsData>(`/property-owners/${id}`).then((data) => data);
};

const put = function (variables: { id: string; data: UpdateProperyOwnerData }) {
  const { id, data } = variables;
  return api.put(`/property-owners/${id}`, data);
};

const patch = function (id: string, data: { name: string }) {
  return api.patch(`/property-owners/${id}`, data);
};

const change_status = function (variables: {
  id: string;
  data: { status: string };
}) {
  const { id, data } = variables;
  return api.put(`/property-owners/change-status/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/property-owners/${id}`);
};

export const id = {
  get,
  put,
  patch,
  change_status,
  remove,
};
