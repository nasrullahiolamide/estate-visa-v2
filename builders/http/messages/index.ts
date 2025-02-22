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
  return api.patch(`/messages/${id}`, data);
};

const reply = function (variables: {
  id: string;
  data: {
    subject: string;
    content: string;
    attachments?: string[];
    senderId: string;
  };
}) {
  const { id, data } = variables;
  return api.post(`/messages/${id}/reply`, data);
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

const user = function (params?: FilterParams) {
  return api
    .get<MessagesList>(`/messages/user`, { params })
    .then((data) => data.data);
};

const remove = function (id: string) {
  return api.delete(`/messages/${id}`);
};

export const messages = {
  post,
  edit,
  remove,
  reply,
  get: {
    id,
    table,
    user,
  },
};
