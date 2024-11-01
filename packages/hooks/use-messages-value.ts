import { useQueryState } from "nuqs";
import { decryptUri, encryptUri } from "@/packages/libraries";

export type ViewTypes = "occupants" | "broadcast" | string;

export type MessagesValue = {
  id: string;
  view: ViewTypes;
};

export function useMessagesValue(
  value?: string,
  fallback: MessagesValue = { id: "", view: "" }
) {
  return {
    get content() {
      return decryptUri<MessagesValue>(value, fallback);
    },
    setContent({ id, view }: MessagesValue) {
      return encryptUri({ id, view });
    },
  };
}

// export function useEstateQuery() {
//   const [estate, setEstate] = useQueryState("id", {
//     clearOnDefault: true,
//     parse: (value) => decryptUri<MessagesValue>(value),
//     serialize: (value: MessagesValue) => encryptUri(value),
//     defaultValue: {},
//   });

//   return {
//     estate,
//     decryptEstate(value: string) {
//       return decryptUri<MessagesValue>(value);
//     },
//     encryptEstate(data: MessagesValue) {
//       return encryptUri(data);
//     },
//     setEstate,
//   };
// }
