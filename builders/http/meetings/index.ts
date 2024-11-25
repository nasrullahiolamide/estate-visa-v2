import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  MeetingData,
  MeetingList,
  MinutesData,
} from "@/builders/types/meetings";

const table = function (params?: FilterParams<{ estateId: string }>) {
  return api
    .get<MeetingList>(`/meetings`, { params })
    .then((data) => data.data);
};

const all = function () {
  return api.get<MeetingData[]>(`/meetings/all`).then((data) => data.data);
};

const id = function (id: string) {
  return api.get<MeetingData>(`/meetings/${id}`).then((data) => data.data);
};

const schedule = function (
  data: Omit<MeetingData, "id" | "minutes" | "file" | "createdAt" | "updatedAt">
) {
  return api.post("/meetings", data);
};

const remove = function (id: string) {
  return api.delete(`/meetings/${id}`);
};

const change_status = function (variables: { id: string; status: string }) {
  const { id, status } = variables;
  return api.patch(`/meetings/change-status/${id}`, { status });
};

const minutes = function (variables: { id: string; data: MinutesData }) {
  const { id, data } = variables;
  return api
    .patch<MinutesData>(`/meetings/${id}/minutes`, data)
    .then((data) => data.data);
};

export const meetings = {
  get: {
    id,
    all,
    table,
  },
  schedule,
  remove,
  change_status,
  minutes,
};
