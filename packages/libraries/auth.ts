import { USER_TYPE } from "./enum";

export function isStaff(userType: string) {
  return USER_TYPE.STAFF.endsWith(userType);
}

export function isAdmin(userType: string) {
  return USER_TYPE.ADMIN.endsWith(userType);
}
export function isSuperAdmin(userType: string) {
  return USER_TYPE.SUPER_ADMIN.endsWith(userType);
}

export function isGuest(userType: string) {
  return USER_TYPE.GUEST.endsWith(userType);
}

export function isUser(userType: string) {
  return USER_TYPE.USER.endsWith(userType);
}
