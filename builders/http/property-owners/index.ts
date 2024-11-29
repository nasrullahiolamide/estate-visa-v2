import { api } from "@/builders/axios";
import { FilterParams } from "@/builders/types/filter-params";
import { id } from "./id";
import {
  PropertyOwnersList,
  UpdateProperyOwnerData,
} from "@/builders/types/property-owners";
import { OnUploadProgress } from "@/packages/hooks/use-on-upload-progress";

const get = function (params?: FilterParams) {
  return api
    .get<PropertyOwnersList>("/property-owners", { params })
    .then(({ data }) => data);
};

const post = function (data: UpdateProperyOwnerData) {
  return api.post("/property-owners", data);
};

const download = function () {
  return api
    .get<Blob>("/property-owners/download", { responseType: "blob" })
    .then((data) => data.data);
};

const upload = function (variables: {
  formData: FormData;
  onUploadProgress?: OnUploadProgress;
}) {
  const { formData, onUploadProgress } = variables;
  return api
    .post("/property-owners/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    })
    .then((data) => data);
};

const template = function () {
  return api
    .get<Blob>("/downloads/template", { responseType: "blob" })
    .then((data) => data.data);
};

export const property_owners = {
  id,
  get,
  post,
  download,
  upload,
  template,
};
