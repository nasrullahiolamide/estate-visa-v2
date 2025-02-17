import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  GateRequestData,
  GateRequestList,
  UpdateGateRequestData,
} from "@/builders/types/gate-requests";

const get = function (params?: FilterParams) {
  return api
    .get<GateRequestList>("/gate-requests", { params })
    .then((data) => data.data);
};

const id = function (id: string) {
  return api
    .get<GateRequestData>(`/gate-requests/${id}`)
    .then((data) => data.data);
};

const post = function (data: UpdateGateRequestData) {
  return api
    .post<GateRequestData>("/gate-requests", data)
    .then((data) => data.data);
};

const edit = function (variables: { id: string; data: UpdateGateRequestData }) {
  const { id, data } = variables;
  return api.patch(`/gate-requests/${id}`, data);
};

const change_status = function (variables: { id: string; status: string }) {
  const { id, status } = variables;
  return api.patch(`/gate-requests/change-status/${id}`, { status });
};

const remove = function (id: string) {
  return api.delete(`/gate-requests/${id}`);
};

const download = function (params: {
  estateId: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}) {
  return api.get(`/gate-requests/download`, { params });
};

export const requests = {
  get,
  id,
  edit,
  change_status,
  post,
  remove,
  download,
};
