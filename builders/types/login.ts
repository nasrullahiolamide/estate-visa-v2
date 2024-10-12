import { USER_TYPE } from "@/packages/libraries";

export type MDNUser = USER_TYPE.SUPER_ADMIN;
export type Owner = USER_TYPE.ADMIN;

export type UserType = MDNUser | Owner;

export type LoginResponseData = {
  roles?: Array<any>;
  permissions?: Array<any>;
  access_token: string;
  username: string;
  full_name: string;
  user_type: UserType;
};

export type StaffLoginResponse = { data: LoginResponseData; message?: string };

export type LoginResponse = StaffLoginResponse;
