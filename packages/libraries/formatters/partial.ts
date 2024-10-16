type Partialized<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T]: NonNullable<T[K]> | undefined;
};

export function partial<T extends Record<PropertyKey, unknown>>(record?: T) {
  const normalized = {} as Partialized<T>;

  for (const key in record) {
    normalized[key] = record[key] ?? undefined;
  }

  return normalized;
}
