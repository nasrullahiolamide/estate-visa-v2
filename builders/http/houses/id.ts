import { api } from "@/builders/axios";
import { UpdateHouseData } from "@/builders/types/houses";
import { SubAdminData } from "@/builders/types/sub-admins";

const get = function (id: string) {
  return api.get<SubAdminData>(`/houses/${id}`).then((data) => data);
};

const edit = function (variables: { id: string; data: UpdateHouseData }) {
  const { id, data } = variables;
  return api.patch(`/houses/${id}`, data);
};

const change_status = function (variables: {
  id: string;
  data: { status: string };
}) {
  const { id, data } = variables;
  return api.patch(`/houses/change-status/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/houses/${id}`);
};

export const id = {
  get,
  edit,
  change_status,
  remove,
};
