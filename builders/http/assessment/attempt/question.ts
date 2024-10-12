import { api } from "@/builders/axios";
import { AttemptQuestions } from "@/builders/types/course-attempt-questions";
import { FilterParams } from "@/builders/types/filter-params";

const get = function question(params: FilterParams) {
  return api.get<{
    count: number;
    next: string;
    previous: string;
    results: Array<{
      user: number;
      question: number;
      assessment_attempt: number;
    }>;
  }>("assessment/assessment-attempt-question", { params });
};

const attempt_questions = function (id?: number) {
  return api
    .get<AttemptQuestions>(`/assessments/attempts/${id}/questions`)
    .then(({ data }) => data);
};

const post = function question(data: {
  user: number;
  question: number;
  assessment_attempt: number;
}) {
  return api.post("assessment/assessment-attempt-question", data);
};

export const question = {
  get,
  post,
  attempt_questions,
};
