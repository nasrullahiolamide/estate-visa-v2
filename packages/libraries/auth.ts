import { USER_TYPE } from "./enum";

export function isAdmin(userType: string) {
  return USER_TYPE.ADMIN.endsWith(userType);
}
export function isSuperAdmin(userType: string) {
  return USER_TYPE.SUPER_ADMIN.endsWith(userType);
}

export function isGuest(userType: string) {
  return USER_TYPE.GUEST.endsWith(userType);
}

export function isOccupant(userType: string) {
  return USER_TYPE.OCCUPANT.endsWith(userType);
}

export function isSubOccupant(userType: string) {
  return USER_TYPE.SUB_OCCUPANT.endsWith(userType);
}

export function isPropertyOwner(userType: string) {
  return USER_TYPE.PROPERTY_OWNER.endsWith(userType);
}

export function isGateMan(userType: string) {
  return USER_TYPE.GATEMAN.endsWith(userType);
}
