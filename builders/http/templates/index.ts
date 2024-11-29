import { api } from "@/builders/axios";

const occupant = function () {
  return api
    .get<Blob>("/occupants/download", { responseType: "blob" })
    .then((data) => data.data);
};
const estate = function () {
  return api
    .get<Blob>("/estates/template", { responseType: "blob" })
    .then((data) => data.data);
};
const house = function () {
  return api
    .get<Blob>("/houses/template", { responseType: "blob" })
    .then((data) => data.data);
};

export const templates = {
  download: {
    occupant,
    estate,
    house,
  },
};
