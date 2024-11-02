import { api } from "@/builders/axios";
import { ProfileData } from "@/builders/types/profile";

const get = function (id: string) {
  return api.get<ProfileData>(`/users/${id}`).then((data) => data.data);
};

const update = function (id: string, data: Partial<{}>) {
  return api.put(`/users/${id}/edit`, data).then(({ data }) => data);
};

const change_status = function (
  id: string,
  data: {
    status: string;
  }
) {
  return api.put(`/users/${id}`, data);
};

export const account = {
  profile: {
    get,
    update,
  },
  change_status,
};
