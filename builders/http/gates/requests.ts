import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  GateRequestList,
  UpdateGateRequestData,
} from "@/builders/types/gate-requests";

const get = function (params?: FilterParams) {
  return api
    .get<GateRequestList>("/gate-requests", { params })
    .then((data) => data.data);
};

const post = function (data: UpdateGateRequestData) {
  return api.post("/gate-requests", data);
};

const edit = function (variables: { id: string; data: UpdateGateRequestData }) {
  const { id, data } = variables;
  return api.patch(`/gate-requests/${id}`, data);
};

const change_status = function (variables: { id: string; status: string }) {
  const { id, status } = variables;
  return api.patch(`/gate-requests/${id}`, { status });
};

const remove = function (id: string) {
  return api.delete(`/gate-requests/${id}`);
};

export const requests = {
  get,
  edit,
  change_status,
  post,
  remove,
};
