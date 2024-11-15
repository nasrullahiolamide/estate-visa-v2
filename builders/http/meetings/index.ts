import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  MeetingData,
  MeetingList,
  MinutesData,
} from "@/builders/types/meetings";

const table = function (params?: FilterParams<{ estateId: string }>) {
  return api
    .get<MeetingList>(`/meetings/`, { params })
    .then((data) => data.data);
};

const all = function () {
  return api.get<MeetingData[]>(`/meetings/all`).then((data) => data.data);
};

const schedule = function (data: MeetingData) {
  return api.post("/meetings", data);
};

const remove = function (id: string) {
  return api.delete(`/meetings/${id}`);
};

const minutes = function (id: string) {
  return api
    .patch<MinutesData>(`/meetings/${id}/minutes`)
    .then((data) => data.data);
};

export const meetings = {
  get: {
    all,
    table,
  },
  schedule,
  remove,
  minutes,
};
