import { USER_TYPE } from "@/packages/libraries";

export type IDSSUser = USER_TYPE.SUPER_ADMIN;
export type OrganizationAdmin = USER_TYPE.ADMIN;
export type OrganizationStaff = USER_TYPE.STAFF;

export type UserType = IDSSUser | OrganizationAdmin | OrganizationStaff;
export type Auth2FaType = "Authenticator" | "Email" | "SMS";

export type LoginResponseData = {
  roles?: Array<any>;
  permissions?: Array<any>;
  auth_2fa_type?: string;
  access_token: string;
  username: string;
  full_name: string;
  user_type: UserType;
  has_completed_onboarding: boolean | null;
  organization_id: number;
  organization_unique_link: string;
};

export type StaffLoginResponse = { data: LoginResponseData; message?: string };
export type TwoFaLoginResponse = {
  token: string;
  message: string;
  auth_2fa_type: Auth2FaType;
};

export type LoginResponse = StaffLoginResponse & TwoFaLoginResponse;
