import { api } from "@/builders/axios";
import { AdminDashboard, Feedback } from "@/builders/types/admin-dashboard";
import { DashboardBadge } from "@/builders/types/badge";
import { Dashboard } from "@/builders/types/dashboard";
import { PerformanceMetrics } from "@/builders/types/performance-metrics";

const dashboard = function () {
  return api.get<Dashboard>("data/dashboard").then(({ data }) => data);
};
const admin_dashboard = function () {
  return api.get<AdminDashboard>("data/dashboard").then(({ data }) => data);
};

const badge = function () {
  return api.get<DashboardBadge>("data/my-badge").then(({ data }) => data);
};

const performance_metrics = function () {
  return api
    .get<PerformanceMetrics>("data/metrics/performance")
    .then(({ data }) => data);
};

const all_feedbacks = function () {
  return api.get<Feedback>("data/all-feedbacks").then(({ data }) => data);
};

export const data = {
  dashboard,
  badge,
  performance_metrics,
  admin_dashboard,
  all_feedbacks,
};
