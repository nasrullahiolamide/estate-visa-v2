import { api } from "@/builders/axios";
import { LoginResponse } from "@/builders/types/login";

export function login(data: { username: string; password: string }) {
  return api.post<LoginResponse>("/auth/login", data).then(({ data }) => data);
}
