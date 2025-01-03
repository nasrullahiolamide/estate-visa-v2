import { setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

import { LoginResponseData } from "@/builders/types/login";
import { PAID_FEATURES } from "@/packages/constants/data";
import { encode, encryptUri } from "../encryption";
import { APP, TOKEN, USER_TYPE, VALIDITY } from "../enum";
import { calculateDeadline } from "./validity-period";

interface HandleLogin extends LoginResponseData {
  access_token: string;
  user_type: string;
}

const admins = [
  USER_TYPE.ADMIN,
  USER_TYPE.SUPER_ADMIN,
  USER_TYPE.SUB_ADMIN,
] as Array<string>;

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
  const { firstname, id: uid, email, estate, isOnboarded } = { ...user };
  const [header, payload, signature] = access_token.split(".") as [
    header: string,
    payload: string,
    signature: string
  ];

  setCookie(APP.USER_DATA, encryptedUser, cookieOptions);
  setCookie(APP.EXPANDED_NAVBAR, "true", cookieOptions);
  setCookie(APP.USERNAME, email);

  setCookie(TOKEN.HEADER, header, cookieOptions);
  setCookie(TOKEN.PAYLOAD, payload, cookieOptions);
  setCookie(TOKEN.SIGNATURE, signature, cookieOptions);

  if (user_type) {
    const isAdmin = admins.includes(user_type);

    setCookie(APP.USER_TYPE, user_type, {
      ...cookieOptions,
      sameSite: "lax",
      encode,
    });

    if (isAdmin) {
      setCookie(APP.EVISA_ACCOUNT, VALIDITY.VALID, {
        ...cookieOptions,
        sameSite: "lax",
        encode,
      });
    }
  }

  if (isOnboarded) {
    setCookie(APP.ONBOARDED, "true", {
      ...cookieOptions,
      sameSite: "lax",
    });
  }

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

    const userInterests = user.estate.interests;
    const featureFlags = PAID_FEATURES.filter(
      (feature) => !userInterests.includes(feature.name)
    ).map((feature) => feature.href);

    try {
      const encodedFeatureFlags = encryptUri(JSON.stringify(featureFlags));

      setCookie(APP.FEATURE_FLAG, encodedFeatureFlags, {
        ...cookieOptions,
        sameSite: "lax",
      });
    } catch (error) {
      console.error("Error encoding FEATURE_FLAG cookie:", error);
    }
  }

  if (occupant) {
    const isValidUser =
      calculateDeadline({
        validityPeriod: occupant.house.validityPeriod,
        dayCreated: occupant.house.updatedAt,
      }).getTime() > Date.now();

    setCookie(APP.OCCUPANT_ID, occupant.id, {
      ...cookieOptions,
      sameSite: "lax",
    });

    setCookie(APP.HOUSE_ID, occupant.house.id, {
      ...cookieOptions,
      sameSite: "lax",
    });

    setCookie(
      APP.EVISA_ACCOUNT,
      !isValidUser ? VALIDITY.EXPIRED : VALIDITY.VALID,
      {
        ...cookieOptions,
        sameSite: "lax",
        encode,
      }
    );
  }
}
