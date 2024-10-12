import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";

type RolesPermissions = {
  id: number;
  name: string;
  description: string;
};

export const permissions = function (params?: FilterParams) {
  return api.get<{
    count: number;
    next: string;
    previous: string;
    results: RolesPermissions[];
  }>("/roles/permissions/list", { params });
};
