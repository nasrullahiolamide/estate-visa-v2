import { api } from "@/builders/axios";
import {
  CreateRoleData,
  Permission,
  RoleData,
  Roles,
} from "@/builders/types/roles";

const list = function () {
  return api.get<Roles>("roles").then(({ data }) => data);
};

const post = function (data: CreateRoleData) {
  return api.post("roles", data).then(({ data }) => data);
};

const get = function (id: number) {
  return api.get<{ data: RoleData }>(`roles/${id}`).then(({ data }) => data);
};

const put = function (variables: { id: number; data: CreateRoleData }) {
  const { id, data } = variables;
  return api.put(`roles/${id}`, data).then(({ data }) => data);
};

const del = function (id: number) {
  return api.delete(`roles/${id}`);
};

const permission_list = function () {
  return api
    .get<{ data: Permission[] }>("roles/permissions/list")
    .then(({ data }) => data);
};

export const roles = {
  list,
  post,
  get,
  put,
  del,
  permission_list,
};
