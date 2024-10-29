export type Arbitrary = string & {};

type Params = {
  page: number;
  pageSize: number;
  search: string;
  sortOrder: "asc" | "desc";
};

export type FilterParams<T extends Record<PropertyKey, unknown> = {}> =
  Partial<Params> & T;
