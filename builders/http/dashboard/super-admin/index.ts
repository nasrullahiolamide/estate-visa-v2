import { api } from "@/builders/axios";
import { SuperAdminDashboardData } from "@/builders/types/super-admin-dashboard";

const get = function ({ timeFilter }: { timeFilter: string }) {
  return api
    .get<SuperAdminDashboardData>("/analytics/superadmin-dashboard", {
      params: timeFilter,
    })
    .then((data) => data.data);
};

export const super_admin = { get };
