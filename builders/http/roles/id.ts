import { api } from "@/builders/axios";

const get = function (role_id: number) {
  return api.get<{
    name: string;
    description: string;
    permission_ids: Array<number>;
  }>(`roles/${role_id}`);
};

const put = function (
  role_id: number,
  data: { name: string; description: string; permission_ids: Array<number> }
) {
  return api.put(`/roles/${role_id}`, data);
};

const patch = function (
  role_id: number,
  data: Partial<{
    name: string;
    description: string;
    permission_ids: Array<number>;
  }>
) {
  return api.patch(`/roles/${role_id}`, data);
};

const del = function (role_id: number) {
  return api.delete(`/roles/${role_id}`);
};

export const id = {
  get,
  put,
  patch,
  del,
};
