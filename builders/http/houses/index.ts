import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import {
  BulkUpdateHouseData,
  HouseData,
  HousesList,
} from "@/builders/types/houses";
import { OnUploadProgress } from "@/packages/hooks/use-on-upload-progress";
import { id } from "./id";

const table = function (params?: FilterParams) {
  return api.get<HousesList>("/houses", { params }).then((data) => data.data);
};

const all = function (id: string) {
  return api.get<HouseData[]>(`/houses/all/${id}`).then((data) => data.data);
};

const post = function (data: BulkUpdateHouseData) {
  return api.post("/houses", data);
};

const download = function () {
  return api
    .get<Blob>("/houses/download", { responseType: "blob" })
    .then((data) => data.data);
};

const upload = function (variables: {
  formData: FormData;
  onUploadProgress?: OnUploadProgress;
}) {
  const { formData, onUploadProgress } = variables;
  return api
    .post("/houses/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
    .then((data) => data);
};

const template = function () {
  return api
    .get<Blob>("/houses/template", { responseType: "blob" })
    .then((data) => data.data);
};

export const houses = {
  id,
  post,
  download,
  upload,
  template,
  list: {
    table,
    all,
  },
};
