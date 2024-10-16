import { ShortCrypt } from "short-crypt";

export type URI = {
  name: string;
  id: number;
  code?: string;
  subject_id?: number;
};

const shortCrypt = new ShortCrypt("esatevisa");

export function encryptUri<T>(data: T = {} as T): string {
  const value = JSON.stringify(data);
  return shortCrypt.encryptToURLComponent(value);
}

export function decryptUri<T extends Record<PropertyKey, unknown>>(
  data?: string,
  fallback: T = {} as T
): T {
  if (!data) return fallback;
  const uint8Array = shortCrypt.decryptURLComponent(data);

  try {
    if (!uint8Array) return fallback;
    const value = Buffer.from(uint8Array).toString("utf8");
    return JSON.parse(value) as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error decrypting URI", error);
    }
    return fallback;
  }
}
