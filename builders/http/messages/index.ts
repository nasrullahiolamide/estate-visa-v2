import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  MessagesData,
  MessagesList,
  UpdateMessagesData,
} from "@/builders/types/messages";

const post = function (data: UpdateMessagesData) {
  return api.post(`/messages`, data);
};

const edit = function (variables: { id: string; data: UpdateMessagesData }) {
  const { id, data } = variables;
  return api.put(`/messages${id}`, data);
};

const table = function (variables: {
  estateId: string;
  params?: FilterParams<
    Partial<{
      type: string;
      startDate: string;
      endDate: string;
    }>
  >;
}) {
  const { estateId, params } = variables;
  return api
    .get<MessagesList>(`/messages/estate/${estateId}`, { params })
    .then((data) => data.data);
};

const id = function (id: string) {
  return api.get<MessagesData[]>(`/messages/${id}`).then((data) => data.data);
};

const remove = function (id: string) {
  return api.delete(`/messages/${id}`);
};

export const messages = {
  post,
  edit,
  remove,
  get: {
    table,
    id,
  },
};
