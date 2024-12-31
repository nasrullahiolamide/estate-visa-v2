import { api } from "@/builders/axios";
import { LoginResponseData } from "@/builders/types/login";

export function login(data: { email: string; password: string }) {
  return api.post<LoginResponseData>("/users/login", data).then((data) => data);
}
