import Cipher from "@ibnlanre/cipher";

const encryption_key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const initialization_vector = process.env.NEXT_PUBLIC_INITIALIZATION_VECTOR;

if (!encryption_key) {
  throw new Error("Encryption key is required");
}

if (!initialization_vector) {
  throw new Error("Initialization vector is required");
}

const cipher = new Cipher({
  initialization_vector,
  algorithm: "aes-256-cbc",
  output_decoding: "base64",
  input_encoding: "utf-8",
  encryption_key,
});

export function encrypt(data?: string) {
  if (!data) return "";
  return cipher.encrypt(data);
}

export function decrypt(data?: string) {
  if (!data) return "";
  return cipher.decrypt(data);
}
