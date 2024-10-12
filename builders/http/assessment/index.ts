import { api } from "@/builders/axios";

import {
  AssessmentData,
  AssessmentList,
  Assessments,
  CreateAssessment,
} from "@/builders/types/assessment";
import { FilterParams } from "@/builders/types/filter-params";

import { attempt } from "./attempt";

const list = function (params?: FilterParams) {
  return api
    .get<AssessmentList>("/assessments", { params })
    .then(({ data }) => data);
};

const upcoming = function (params?: FilterParams) {
  return api
    .get<{ data: AssessmentData[] }>("/assessments/upcoming", {
      params,
    })
    .then(({ data }) => data);
};

const post = function (data: CreateAssessment) {
  return api.post("/assessments", data);
};

const get = function (id?: number) {
  return api.get<Assessments>(`/assessments/${id}`).then(({ data }) => data);
};

const put = function (variables: { id: number; data: CreateAssessment }) {
  const { id, data } = variables;
  return api.put(`/assessments/${id}`, data);
};

const remove = function (id: number) {
  return api.delete(`/assessments/${id}`);
};

export const assessment = {
  list,
  post,
  get,
  put,
  remove,
  attempt,
  upcoming,
};
