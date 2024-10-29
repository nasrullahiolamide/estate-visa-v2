import { useQueryState } from "nuqs";
import { decryptUri, encryptUri } from "@/packages/libraries";
import { EstatesData } from "@/builders/types/estates";

export type ActionTypes = "edit" | "view" | "add" | string;

export type EstateValue = Partial<
  {
    action: ActionTypes;
  } & EstatesData
>;

export function useEstateValue(
  value?: string,
  fallback: EstateValue = { id: "", action: "" }
) {
  return {
    get estate() {
      return decryptUri<EstateValue>(value, fallback);
    },
    setEstate({ id, action }: EstateValue) {
      return encryptUri({ id, action });
    },
  };
}

export function useEstateQuery() {
  const [estate, setEstate] = useQueryState("id", {
    clearOnDefault: true,
    parse: (value) => decryptUri<EstateValue>(value),
    serialize: (value: EstateValue) => encryptUri(value),
    defaultValue: {},
  });

  return {
    estate,
    decryptEstate(value: string) {
      return decryptUri<EstateValue>(value);
    },
    encryptEstate(data: EstateValue) {
      return encryptUri(data);
    },
    setEstate,
  };
}
