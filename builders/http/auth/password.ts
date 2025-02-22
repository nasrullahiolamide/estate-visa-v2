import { api } from "@/builders/axios";

function change(data: { newPassword: string; token: string }) {
  return api.post("/users/reset-password", data);
}

function forgot(data: { email: string }) {
  return api.post<{
    message: string;
  }>("/users/forgot-password", data);
}

export const password = {
  change,
  forgot,
};
