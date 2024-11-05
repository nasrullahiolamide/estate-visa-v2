import { api } from "@/builders/axios";
import { GateList, GatesData, UpdateGateData } from "@/builders/types/gates";

const get = function (id: string) {
  return api.get<GatesData[]>(`/gates/all/${id}`).then((data) => data);
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
  post,
  get,
  edit,
  remove,
};
