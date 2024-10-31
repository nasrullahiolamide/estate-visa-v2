type Primitives = string | number | null | undefined;

export function makePath(...paths: Primitives[]) {
  return paths.filter(Boolean).join("/").replace(/\/+/g, "/").trim();
}
