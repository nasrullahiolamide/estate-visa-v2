import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { GateList, UpdateGateData } from "@/builders/types/gates";
import { requests } from "./requests";

const get = function (variables: { id: string; params?: FilterParams }) {
  const { id, params } = variables;
  return api
    .get<GateList>(`/gates/all/${id}`, { params })
    .then((data) => data.data);
};

const edit = function (variables: { id: string; data: UpdateGateData }) {
  const { id, data } = variables;
  return api.put(`/gates/${id}`, data);
};

const post = function (data: UpdateGateData) {
  return api.post("/gates", data);
};

const remove = function (id: string) {
  return api.delete(`/gates/${id}`);
};

export const gates = {
  requests,
  post,
  get,
  edit,
  remove,
};
