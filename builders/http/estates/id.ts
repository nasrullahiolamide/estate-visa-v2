import { api } from "@/builders/axios";
import { Estate, UpdateEstateData } from "@/builders/types/estates";

const get = function (id: string) {
  return api.get<Estate>(`/estates/${id}`).then((data) => data);
};

const put = function (variables: { id: string; data: UpdateEstateData }) {
  const { id, data } = variables;
  return api.put(`/estates/${id}`, data);
};

const patch = function (id: string, data: { name: string }) {
  return api.patch(`/estates/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/estates/${id}`);
};

export const id = {
  get,
  put,
  patch,
  remove,
};
