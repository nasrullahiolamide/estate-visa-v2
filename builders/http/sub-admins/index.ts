import { api } from "@/builders/axios";
import { SubAdminData } from "@/builders/types/sub-admins";

const post = function (data: SubAdminData) {
  return api.post("/users/sub-admins/create", data);
};

export const sub_admins = {
  post,
};
