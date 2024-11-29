import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { AddOccupantData, OccupantList } from "@/builders/types/occupants";
import { id } from "./id";
import { OnUploadProgress } from "@/packages/hooks/use-on-upload-progress";

const get = function (params?: FilterParams) {
  return api
    .get<OccupantList>("/occupants", { params })
    .then((data) => data.data);
};

const post = function (data: AddOccupantData) {
  return api.post("/occupants", data);
};

const download = function () {
  return api
    .get<Blob>("/occupants/download", { responseType: "blob" })
    .then((data) => data.data);
};

const upload = function (variables: {
  formData: FormData;
  onUploadProgress?: OnUploadProgress;
}) {
  const { formData, onUploadProgress } = variables;
  return api
    .post("/occupants/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
    .then((data) => data);
};

const template = function () {
  return api
    .get<Blob>("/occupants/template", { responseType: "blob" })
    .then((data) => data.data);
};

export const occupants = {
  id,
  get,
  post,
  download,
  upload,
  template,
};
