import { api } from "@/builders/axios";
import { Attempts } from "@/builders/types/assessment";

const create_assessment = (id: number) => {
  return api
    .post<Attempts>(`/assessments/courses/attempt/${id}`)
    .then(({ data }) => data);
};

export const course = {
  create_assessment,
};
