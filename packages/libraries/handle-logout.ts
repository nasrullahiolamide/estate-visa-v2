import { deleteCookie } from "cookies-next";
import { APP, TOKEN } from "./enum";

export function handleLogout() {
  const cookies = [
    TOKEN.HEADER,
    TOKEN.PAYLOAD,
    TOKEN.SIGNATURE,
    // APP.ORG_ID,
    // APP.USER_TYPE,
    // APP.UNIQUE_LINK,
    // APP.FULL_NAME,
    // APP.USER_NAME,
  ];

  cookies.forEach((key) => deleteCookie(key));
}
