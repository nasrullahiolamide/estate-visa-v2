import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { ProfileData } from "@/builders/types/profile";
import { SubAdminData, SubAdminList } from "@/builders/types/sub-admins";
import { id } from "./id";

const get = function (variables: { id: string; params?: FilterParams }) {
  const { id, params } = variables;
  return api
    .get<SubAdminList>(`/users/sub-admins/${id}`, { params })
    .then((data) => data.data);
};

const post = function (data: SubAdminData) {
  return api
    .post<ProfileData>("/users/sub-admins/create", data)
    .then((data) => data.data);
};

export const sub_admins = {
  id,
  get,
  post,
};
