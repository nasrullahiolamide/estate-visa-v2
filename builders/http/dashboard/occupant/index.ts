import { api } from "@/builders/axios";
import { OccupantDashboard } from "@/builders/types/occupant-dashboard";

const get = function (id: string) {
  return api
    .get<OccupantDashboard>(`/analytics/occupant-dashboard/${id}`)
    .then((data) => data.data);
};

const service_requests = function (status?: string) {
  return api
    .get<
      {
        id: string;
        serviceType: string;
        preferredTime: string;
        status: string;
        updatedAt: string;
      }[]
    >("/analytics/occupant-dashboard/service-requests", {
      params: { status },
    })
    .then((data) => data.data);
};

export const occupant = { get, service_requests };
