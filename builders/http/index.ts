import { account } from "./account";
import { auth } from "./auth";
import { estates } from "./estates";
import { houses } from "./houses";
import { occupants } from "./occupants";
import { property_owners } from "./property-owners";
import { sub_admins } from "./sub-admins";
import { upload } from "./upload";

export const http = {
  auth,
  upload,
  account,
  estates,
  property_owners,
  sub_admins,
  occupants,
  houses,
};
