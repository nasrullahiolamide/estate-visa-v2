import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { GateRequestList } from "@/builders/types/gate-requests";
import { UpdateGateData } from "@/builders/types/gates";

const get = function (params?: FilterParams) {
  return api
    .get<GateRequestList>("/gates-requests", { params })
    .then((data) => data.data);
};

const edit = function (variables: { id: string; data: UpdateGateData }) {
  const { id, data } = variables;
  return api.patch(`/gates-requests/${id}`, data);
};

const change_status = function (variables: { id: string; status: string }) {
  const { id, status } = variables;
  return api.patch(`/gate-requests/${id}`, { status });
};

const post = function (data: UpdateGateData) {
  return api.post("/gates", data);
};

const remove = function (id: string) {
  return api.delete(`/gates-requests/${id}`);
};

export const requests = {
  get,
  edit,
  change_status,
  post,
  remove,
};
