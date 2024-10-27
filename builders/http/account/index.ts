import { api } from "@/builders/axios";
import { ProfileData } from "@/builders/types/profile";

const get = function (id: string) {
  return api
    .get<{
      data: ProfileData;
    }>(`/users/${id}`)
    .then(({ data }) => data);
};

const edit = function (
  id: string,
  data: { password: string; new_password: string }
) {
  return api
    .post<{
      message: string;
    }>(`/users/${id}/edit`, data)
    .then(({ data }) => data);
};

export const account = {
  profile: {
    get,
    edit,
  },
};
