import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { id } from "./id";
import {
  ServiceRequestList,
  UpdateServiceRequestsData,
} from "@/builders/types/service-requests";

const get = function (params?: FilterParams) {
  return api
    .get<ServiceRequestList>("/service-requests", { params })
    .then((data) => data.data);
};
const post = function (data: UpdateServiceRequestsData) {
  return api.post("/service-requests", data);
};

export const service_requests = {
  id,
  get,
  post,
};
