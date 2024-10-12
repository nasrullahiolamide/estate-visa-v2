import { api } from "@/builders/axios";
import { CreateAttempt } from "@/builders/types/assessment";
import { FilterParams } from "@/builders/types/filter-params";
import {
  ProfessionalExamData,
  ProfessionalExamList,
} from "@/builders/types/professional-exam";

const list = function (params?: FilterParams) {
  return api
    .get<ProfessionalExamList>("/professional-exams", { params })
    .then(({ data }) => data);
};

const get = function (id: number) {
  return api
    .get<{ data: ProfessionalExamData }>(`/professional-exams/${id}`)
    .then(({ data }) => data);
};

const create_attempt = function (id: number) {
  return api
    .post<CreateAttempt>(`/professional-exams/${id}/attempt`)
    .then(({ data }) => data);
};

export const professional_exams = {
  list,
  create_attempt,
  get,
};
