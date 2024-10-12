import { api } from "@/builders/axios";

export function logout() {
  return api.post<{ message: string }>("/auth/logout").then(({ data }) => data);
}
