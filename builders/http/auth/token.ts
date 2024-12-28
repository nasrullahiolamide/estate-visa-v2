import { api } from "@/builders/axios";

function refresh(data: { email: string; otp: string }) {
  return api.post("/users/token/refresh", data);
}

export const token = {
  refresh,
};
