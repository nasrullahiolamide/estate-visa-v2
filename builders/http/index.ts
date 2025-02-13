import { account } from "./account";
import { auth } from "./auth";
import { dashboard } from "./dashboard";
import { estates } from "./estates";
import { gates } from "./gates";
import { houses } from "./houses";
import { market_rules } from "./market-rules";
import { meetings } from "./meetings";
import { messages } from "./messages";
import { occupants } from "./occupants";
import { products } from "./products";
import { property_owners } from "./property-owners";
import { service_requests } from "./service-requests";
import { sub_admins } from "./sub-admins";
import { sub_occupants } from "./sub-occupants";
import { templates } from "./templates";
import { upload } from "./upload";

export const http = {
  auth,
  upload,
  account,
  estates,
  property_owners,
  sub_admins,
  occupants,
  sub_occupants,
  houses,
  gates,
  dashboard,
  service_requests,
  meetings,
  messages,
  templates,
  products,
  market_rules,
};
