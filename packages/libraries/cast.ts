import { toNumber, toString } from "lodash";

export const number = <Value>(value: Value, fallback: any = null) => {
  if (!value) return fallback;
  return toNumber(value);
};

export const string = <Value>(value: Value, fallback: any = null) => {
  if (!value) return fallback;
  return toString(value);
};

export const boolean = <Value>(value: Value, fallback: any = null) => {
  if (!value) return fallback;
  return Boolean(value);
};

export const array = <Value>(value: Value, fallback: any = []) => {
  if (Array.isArray(value) && value.length) return value;
  return fallback;
};

export const cast = {
  number,
  string,
  boolean,
  array,
};
