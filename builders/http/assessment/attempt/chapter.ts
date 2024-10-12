import { api } from "@/builders/axios";
import { Attempts } from "@/builders/types/assessment";

export const create_assessment = function (id: number) {
  return api
    .post<Attempts>(`/assessments/chapters/attempt/${id}`)
    .then(({ data }) => data);
};

export const chapter = {
  create_assessment,
};
