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
  USER_TYPE = "uType",
  USERNAME = "uNme",
  FULL_NAME = "fLNe",
  EXPANDED_NAVBAR = "edNav",
  USER_ID = "uID",
  USER_DATA = "uDat",
  OCCUPANT_ID = "oID",
  ESTATE_ID = "eID",
  HOUSE_ID = "hID",
  FEATURE_FLAG = "sFg",
}

export enum USER_TYPE {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  SUB_ADMIN = "sub-admin",
  OCCUPANT = "principal-occupant",
  SUB_OCCUPANT = "sub-occupant",
  PROPERTY_OWNER = "property-owner",
  GATEMAN = "gateman",
  GUEST = "website-guest",
}

export enum PAGES {
  WEBSITE = "/",
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  NOTIFICATIONS = "/notifications",
  LOGIN = "/login",
  LOGOUT = "/logout",
  VERIFY_EMAIL = "/verify-email",
  RESET_PASSWORD = "/reset-password",
  TALK_TO_US = "/talk-to-us",
  SUB_ADMINS = "/sub-admins",
  PROPERTY_OWNERS = "/property-owners",
  OCCUPANTS = "/occupants",
  SUB_OCCUPANTS = "/sub-occupants",
  HOUSES = "/houses",
  GATES = "/gates",
  GATE_REQUESTS = "/gate-requests",
  MESSAGES = "/messages",
  NOTICE_BOARD = "/notice-board",
  MEETINGS = "/meetings",
  MINUTES = "/minutes",
  SERVICE_REQUESTS = "/service-requests",
  MARKET_PLACE = "/market-place",
  MY_LISTINGS = "/my-listings",
  MARKET_RULES = "/rules",
  ESTATES = "/estates",
  ADD_NEW_ESTATE = "/add-new-estate",
  NOT_FOUND = "/404",
}

export enum USER_ACTIONS {
  CONFIRM = "confirm",
  DELETE = "delete",
  ADD = "add",
  VIEW_EDIT = "view-edit",
}

export enum MODALS {
  //======== ADD =========
  ADD_DETAILS = "add-details",
  ADD_SUB_ADMIN = USER_ACTIONS.ADD + "-sub-admin",
  ADD_NEW_OCCUPANTS = USER_ACTIONS.ADD + "-new-occupants",
  ADD_NEW_HOUSE = USER_ACTIONS.ADD + "-new-house",
  ADD_MEETINGS_MINUTES = USER_ACTIONS.ADD + "-meetings-minutes",

  //======== VIEW/EDIT =========
  VIEW_EDIT_DETAILS = "view/edit_details",
  VIEW_EDIT = "view-edit",
  VIEW_EDIT_SUB_ADMIN = USER_ACTIONS.VIEW_EDIT + "-sub-admin",
  VIEW_EDIT_NEW_OCCUPANTS = USER_ACTIONS.VIEW_EDIT + "-new-occupants",
  VIEW_SUB_OCCUPANTS = USER_ACTIONS.VIEW_EDIT + "-sub-occupants",
  VIEW_EDIT_HOUSES = USER_ACTIONS.VIEW_EDIT + "-houses",
  VIEW_EDIT_GATES = USER_ACTIONS.VIEW_EDIT + "-gates",

  PRODUCT_DETAIL = "product-detail",
  CONFIRMATION = "confirmation",
  FORM_DETAILS = "form-details",
  WRITE_BROADCAST_MESSAGE = "write-broadcast-message",
  WRTIE_MESSAGE = "write-message",
  EDIT_MESSAGE = "edit-message",
  REPLY_MESSAGE = "reply-message",
  UPLOAD_RESOURCES = "upload-resources",
  CHANGE_PASSWORD = "change-password",
  SHARE = "share",
}

export enum FILE {
  MINUTES = "minutes",
  PROFILE_PICTURES = "profile-pictures",
  MESSAGES = "messages",
  OCCUPANTS = "occupants",
  PROPERTY_OWNERS = "property-owners",
  HOUSES = "houses",
  OTHERS = "others",
}
