import { setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

import { decrypt, decryptUri, encode, encryptUri } from "../encryption";
import { APP, TOKEN } from "../enum";
import { string } from "mathjs";
import { ProfileData } from "@/builders/types/profile";
import { LoginResponseData } from "@/builders/types/login";

interface HandleLogin extends LoginResponseData {
  access_token: string;
  user_type: string;
}

const ESSENTIAL_FEATURES = ["Residence Management", "Access Request"];

export const cookieOptions = {
  secure: true,
  maxAge: 60 * 60 * 4,
  sameSite: "strict",
} satisfies OptionsType;

export function handleLogin({
  access_token,
  user,
  expiresIn,
  occupant,
  user_type,
}: HandleLogin) {
  const encryptedUser = encryptUri(user);
  const { firstname, lastname, id: uid, email, estate } = { ...user };
  const full_name = `${firstname} ${lastname ? `${lastname}` : ""}`;

  const [header, payload, signature] = access_token.split(".") as [
    header: string,
    payload: string,
    signature: string
  ];

  setCookie(APP.USER_DATA, encryptedUser, cookieOptions);

  setCookie(TOKEN.HEADER, header, cookieOptions);
  setCookie(TOKEN.PAYLOAD, payload, cookieOptions);
  setCookie(TOKEN.SIGNATURE, signature, cookieOptions);

  setCookie(APP.EXPANDED_NAVBAR, "true", cookieOptions);

  if (user_type) {
    setCookie(APP.USER_TYPE, user_type, {
      ...cookieOptions,
      sameSite: "lax",
      encode,
    });
  }

  if (
    user.estate.interests.some((interest) =>
      ESSENTIAL_FEATURES.includes(interest)
    )
  ) {
    setCookie(APP.FEATURE_FLAG, "true", {
      ...cookieOptions,
      sameSite: "lax",
      encode,
    });
  }

  setCookie(APP.USERNAME, email);

  if (firstname) {
    setCookie(APP.FULL_NAME, firstname, {
      ...cookieOptions,
      sameSite: "lax",
    });
  }

  if (uid) {
    setCookie(APP.USER_ID, uid, {
      ...cookieOptions,
      sameSite: "lax",
    });
  }

  if (estate) {
    setCookie(APP.ESTATE_ID, estate.id, {
      ...cookieOptions,
      sameSite: "lax",
    });
  }

  if (occupant) {
    setCookie(APP.OCCUPANT_ID, occupant.id, {
      ...cookieOptions,
      sameSite: "lax",
    });

    setCookie(APP.HOUSE_ID, occupant.house.id, {
      ...cookieOptions,
      sameSite: "lax",
    });
  }
}
