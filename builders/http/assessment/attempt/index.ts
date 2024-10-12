import { api } from "@/builders/axios";
import {
  AssessmentQuestions,
  Attempt,
  AttemptsList,
  SubmitAssessment,
} from "@/builders/types/assessment";
import { FilterParams } from "@/builders/types/filter-params";

import { chapter } from "./chapter";
import { course } from "./course";
import { professional_exams } from "./professional_exams";
import { question } from "./question";

const list = function attempt(params?: FilterParams) {
  return api
    .get<AttemptsList>("/attempts", { params })
    .then(({ data }) => data);
};

const fetch_questions = function (id: number) {
  return api
    .get<AssessmentQuestions>(`attempts/${id}/questions`)
    .then(({ data }) => data);
};

const start_assessment = function (id: number) {
  return api.get<Attempt>(`attempts/${id}?start=True`).then(({ data }) => data);
};

const patch = (variables: {
  id: number;
  data: {
    action: "Update";
    answers: Array<{ question_id: number; answer_id: number }>;
  };
}) => {
  const { id, data } = variables;
  return api
    .patch<SubmitAssessment>(`attempts/${id}`, data)
    .then(({ data }) => data);
};

const put = function attempt(variables: {
  id: number;
  data: {
    action: "Submit";
    answers: Array<{ question_id: number; answer_id: number }>;
  };
}) {
  const { id, data } = variables;
  return api
    .put<SubmitAssessment>(`attempts/${id}`, data)
    .then(({ data }) => data);
};

export const attempt = {
  list,
  question,
  start_assessment,
  professional_exams,
  fetch_questions,
  course,
  chapter,
  patch,
  put,
};
