import { api } from "@/builders/axios";
import { AdminDashboardData } from "@/builders/types/admin-dashboard";

const get = function () {
  return api
    .get<AdminDashboardData>("/analytics/superadmin-dashboard")
    .then((data) => data.data);
};

export const admin = { get };
