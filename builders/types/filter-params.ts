export type Arbitrary = string & {};

type Params = {
  ordering: "asc" | "desc";
  page: number;
  search: string;
};

export type FilterParams<T extends Record<PropertyKey, unknown> = {}> =
  Partial<Params> & T;
