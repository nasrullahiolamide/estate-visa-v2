export enum TOKEN {
  /** Verification Header */
  HEADER = "vHdr",
  /** Verification Payload */
  PAYLOAD = "vPl",
  /** Verification Signature */
  SIGNATURE = "vSg",
}

export enum APP {
  TOKEN = "tKn",
  ORG_ID = "orgId",
  USER_DATA = "uData",
  USER_TYPE = "uType",
  EMAIL = "eMail",
  FULL_NAME = "fLNe",
  UNIQUE_LINK = "uniqL",
  USER_NAME = "uID",
}

export enum USER_TYPE {
  SUPER_ADMIN = "EVISA User",
  ADMIN = "Organization Admin",
  STAFF = "Organization Staff",
  GUEST = "EVISA Guest",
  USER = "User",
}

export enum PAGES {
  LOGIN = "/login",
  REGISTER = "/signup",
  VERIFY_EMAIL = "/verify-email",
  RESET_PASSWORD = "/reset-password",
}

export enum MODALS {}
