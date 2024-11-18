import { api } from "@/builders/axios";
import {
  ServiceRequestsData,
  UpdateServiceRequestsData,
} from "@/builders/types/service-requests";

const get = function (id: string) {
  return api
    .get<ServiceRequestsData>(`/service-requests/${id}`)
    .then((data) => data.data);
};

const edit = function (variables: {
  id: string;
  data: UpdateServiceRequestsData;
}) {
  const { id, data } = variables;
  return api.patch(`/service-requests/${id}`, data);
};

const remove = function (id: string) {
  return api.delete(`/service-requests/${id}`);
};

const change_status = function (variables: { id: string; status: string }) {
  const { id, status } = variables;
  return api.patch(`/service-requests/change-status/${id}`, { status });
};

export const id = {
  get,
  edit,
  remove,
  change_status,
};
