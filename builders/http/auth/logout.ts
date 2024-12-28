import { api } from "@/builders/axios";

export function logout() {
  return api
    .post<{ message: string }>("/users/logout")
    .then(({ data }) => data);
}
