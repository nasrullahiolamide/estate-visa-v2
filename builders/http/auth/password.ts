import { api } from "@/builders/axios";

function change(data: { password: string; email: string; otp: string }) {
  return api.post("/auth/password/change", data);
}

function forgot(data: { email: string }) {
  return api.post<{
    message: string;
  }>("/auth/password/forgot", data);
}

export const password = {
  change,
  forgot,
};
