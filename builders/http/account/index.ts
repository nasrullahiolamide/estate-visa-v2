import { api } from "@/builders/axios";
import { ProfileData, UpdateProfileData } from "@/builders/types/profile";

const get = function (id: string) {
  return api.get<ProfileData>(`/users/${id}`).then((data) => data.data);
};

const update = function (variables: { id: string; data: UpdateProfileData }) {
  const { id, data } = variables;
  return api.put(`/users/${id}`, data).then(({ data }) => data);
};

const change_password = function (variables: {
  id: string;
  data: {
    oldPassword?: string;
    password: string;
    isOnboarded?: boolean;
  };
}) {
  const { id, data } = variables;
  return api.put(`/users/change-password/${id}`, data).then(({ data }) => data);
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
    change_password,
  },
};
