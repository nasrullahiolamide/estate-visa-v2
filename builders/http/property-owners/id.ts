import { api } from "@/builders/axios";
import { Estate, UpdateEstateData } from "@/builders/types/estates";

const get = function (id: string) {
  return api.get<Estate>(`/property-owners/${id}`).then((data) => data);
};

const put = function (variables: { id: string; data: UpdateEstateData }) {
  const { id, data } = variables;
  return api.put(`/property-owners/${id}`, data);
};

const patch = function (id: string, data: { name: string }) {
  return api.patch(`/property-owners/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/property-owners/${id}`);
};

export const id = {
  get,
  put,
  patch,
  remove,
};
