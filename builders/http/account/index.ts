import { api } from "@/builders/axios";
import { ProfileData } from "@/builders/types/profile";

const get = function () {
  return api
    .get<{
      data: ProfileData;
    }>("/account/profile")
    .then(({ data }) => data);
};

const edit = function (data: { password: string; new_password: string }) {
  return api
    .post<{
      message: string;
    }>("/account/profile/edit", data)
    .then(({ data }) => data);
};

export const account = {
  profile: {
    get,
    edit,
  },
};
