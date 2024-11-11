import { deleteCookie, setCookie } from "cookies-next";
import { APP, TOKEN, USER_TYPE } from "../enum";
import { encode } from "../encryption";

export async function handleLogout() {
  const cookies = [
    TOKEN.HEADER,
    TOKEN.PAYLOAD,
    TOKEN.SIGNATURE,
    APP.FULL_NAME,
    APP.ESTATE_ID,
    APP.HOUSE_ID,
    APP.USER_DATA,
    APP.OCCUPANT_ID,
    APP.USER_ID,
  ];

  cookies.forEach((key) => deleteCookie(key));
  setCookie(APP.USER_TYPE, USER_TYPE.GUEST, {
    encode,
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}
