import { api } from "@/builders/axios";
import { SubAdminData, UpdateSubAdminData } from "@/builders/types/sub-admins";

const get = function (id: string) {
  return api.get<SubAdminData>(`/users/${id}`).then((data) => data);
};

const put = function (variables: { id: string; data: UpdateSubAdminData }) {
  const { id, data } = variables;
  return api.put(`/users/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/users/${id}`);
};

export const id = {
  get,
  put,
  remove,
};
