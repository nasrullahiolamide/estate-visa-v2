import { api } from "@/builders/axios";
import {
  AccessRequestData,
  AdminDashboardData,
  ServiceRequestData,
} from "@/builders/types/admin-dashboard";

const get = function () {
  return api
    .get<AdminDashboardData>("/analytics/admin-dashboard")
    .then((data) => data.data);
};

const access_requests = function ({ period }: { period: string }) {
  return api
    .get<AccessRequestData>("/analytics/admin-dashboard/access-requests", {
      params: { period },
    })
    .then((data) => data.data);
};

const service_requests = function ({ period }: { period: string }) {
  return api
    .get<ServiceRequestData>("/analytics/admin-dashboard/service-requests", {
      params: { period },
    })
    .then((data) => data.data);
};

export const admin = { get, access_requests, service_requests };
