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
  SUPER_ADMIN = "MDN User",
  ADMIN = "Estate Admin",
  STAFF = "Estate Staff",
  GUEST = "MDN Guest",
  USER = "User",
}

export enum PAGES {
  DASHBOARD = "/",
  PROFILE = "/profile",
  LOGIN = "/login",
  LOGOUT = "/logout",
  REGISTER = "/signup",
  VERIFY_EMAIL = "/verify-email",
  RESET_PASSWORD = "/reset-password",
  TALK_TO_US = "/talk-to-us",

  // admin and super-admin
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

export enum USER_ACTIONS {
  CONFIRM = "confirm",
  DELETE = "delete",
  ADD = "add",
  VIEW_EDIT = "view-edit",
}

export enum MODALS {
  //======== ADD =========
  ADD_SUB_ADMIN = USER_ACTIONS.ADD + "-sub-admin",
  ADD_NEW_OCCUPANTS = USER_ACTIONS.ADD + "-new-occupants",
  ADD_NEW_HOUSE = USER_ACTIONS.ADD + "-new-house",
  ADD_MEETINGS_MINUTES = USER_ACTIONS.ADD + "-meetings-minutes",

  //======== VIEW/EDIT =========
  VIEW_EDIT_SUB_ADMIN = USER_ACTIONS.VIEW_EDIT + "-sub-admin",
  VIEW_EDIT_NEW_OCCUPANTS = USER_ACTIONS.VIEW_EDIT + "-new-occupants",
  VIEW_SUB_OCCUPANTS = USER_ACTIONS.VIEW_EDIT + "-sub-occupants",
  VIEW_EDIT_HOUSES = USER_ACTIONS.VIEW_EDIT + "-houses",
  VIEW_EDIT_GATES = USER_ACTIONS.VIEW_EDIT + "-gates",

  //======== DELETE =========
  DELETE_SUB_ADMIN = USER_ACTIONS.DELETE + "-sub-admin",
  DELETE_PROPERTY_OWNER = USER_ACTIONS.DELETE + "-property-owner",
  DELETE_NEW_OCCUPANTS = USER_ACTIONS.VIEW_EDIT + "-new-occupants",

  //======== CONFIRM =========
  CONFIRMATION = USER_ACTIONS.CONFIRM,
  CONFIRM_DELETE = USER_ACTIONS.CONFIRM + "-delete",
  CONFIRM_LOGOUT = USER_ACTIONS.CONFIRM + "-logout",
  CONFIRM_OCCUPANT = USER_ACTIONS.CONFIRM + "-occupant",
}
