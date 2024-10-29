import { api } from "@/builders/axios";
import { ProfileData } from "@/builders/types/profile";

const get = function (id: string) {
  return api.get<ProfileData>(`/users/${id}`).then((data) => data.data);
};

const update = function (id: string, data: Partial<{}>) {
  return api.put(`/users/${id}/edit`, data).then(({ data }) => data);
};

export const account = {
  profile: {
    get,
    update,
  },
};
