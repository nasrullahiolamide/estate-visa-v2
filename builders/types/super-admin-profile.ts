import { Nullish } from "./shared";

export type SuperAdminUpdateData = Nullish<
  Partial<{
    fullname: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }>
>;
