export type Arbitrary = string & {};

type Params = {
  page: number;
  pageSize: number;
  search: string;
  sortOrder: string;
  sortBy: string;
  status: string;
};

export type FilterParams<T extends Record<PropertyKey, unknown> = {}> =
  Partial<Params> & T;
