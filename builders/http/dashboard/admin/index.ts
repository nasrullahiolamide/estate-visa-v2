import { api } from "@/builders/axios";
import {
  AdminDashboard,
  AdminDashboardData,
} from "@/builders/types/admin-dashboard";

const get = function () {
  return api
    .get<AdminDashboardData>("/analytics/admin-dashboard")
    .then((data) => data.data);
};

export const admin = { get };
