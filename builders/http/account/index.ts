import { api } from "@/builders/axios";
import { ProfileBadgeData } from "@/builders/types/account";
import { ProfileData } from "@/builders/types/profile";

const get = function () {
  return api
    .get<{
      data: ProfileData;
    }>("/account/profile")
    .then(({ data }) => data);
};

const change_password = function (data: {
  password: string;
  new_password: string;
}) {
  return api
    .post<{
      message: string;
    }>("/account/change-password", data)
    .then(({ data }) => data);
};

export const account = {
  change_password,
  profile: {
    get,
  },
};
