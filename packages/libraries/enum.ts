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
  EXPANDED_NAVBAR = "edNav",
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
  DASHBOARD = "/",
  PROFILE = "/profile",
  LOGIN = "/login",
  REGISTER = "/signup",
  VERIFY_EMAIL = "/verify-email",
  RESET_PASSWORD = "/reset-password",
  SUB_ADMINS = "/sub-admins",
  PROPERTY_OWNERS = "/property-owners",
  OCCUPANTS = "/occupants",
  SUB_OCCUPANTS = "/sub-occupants",
  HOUSES = "/houses",
  GATES = "/gates",
  MESSAGES = "/messages",
  MEETINGS = "/meetings",
  SERVICE_REQUESTS = "/service-requests",
  MARKET_PLACE = "/market-place",
  ESTATES = "/estates",
}

export enum MODALS {}
