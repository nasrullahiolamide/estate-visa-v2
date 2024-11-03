import { api } from "@/builders/axios";
import { ProfileData } from "@/builders/types/profile";

const get = function (id: string) {
  return api.get<ProfileData>(`/users/${id}`).then((data) => data.data);
};

const update = function (id: string, data: Partial<{}>) {
  return api.put(`/users/${id}`, data).then(({ data }) => data);
};

const change_status = function (variables: { id: string; status: string }) {
  const { id, status } = variables;
  return api.put(`/users/${id}`, {
    status,
  });
};

export const account = {
  profile: {
    get,
    update,
    change_status,
  },
};
