import { toNumber, toString } from "lodash";

export const number = <T>(value: T | null, fallback = 0) => {
  if (!value) return fallback;
  return toNumber(value);
};

export const string = <T>(value: T, fallback = "") => {
  if (!value) return fallback;
  return toString(value);
};

export const boolean = <T>(value: T) => {
  return Boolean(value);
};

export const pass = {
  number,
  string,
  boolean,
};
