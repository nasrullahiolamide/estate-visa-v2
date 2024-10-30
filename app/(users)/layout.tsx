import { PropsWithChildren, ReactNode } from "react";
import { getUserType } from "@/packages/actions";
import { USER_TYPE } from "@/packages/libraries";
// import { redirect } from "next/navigation";
// import { getCookies } from "cookies-next";
// import { handleError } from "@/packages/notification";

type LayoutProps = PropsWithChildren<{
  admin: ReactNode;
  super_admin: ReactNode;
  occupant: ReactNode;
  sub_occupant: ReactNode;
  property_owner: ReactNode;
  gateman: ReactNode;
  guest: ReactNode;
}>;

export default async function Layout({
  admin,
  super_admin,
  occupant,
  sub_occupant,
  property_owner,
  gateman,
  guest,
}: LayoutProps) {
  const userType = await getUserType();
  // const allCookies = getCookies();
  // const requiredCookies = [
  //   TOKEN.HEADER,
  //   TOKEN.PAYLOAD,
  //   TOKEN.SIGNATURE,
  //   APP.USER_TYPE,
  // ];

  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.OCCUPANT]: occupant,
    [USER_TYPE.SUB_OCCUPANT]: sub_occupant,
    [USER_TYPE.PROPERTY_OWNER]: property_owner,
    [USER_TYPE.GATEMAN]: gateman,
    [USER_TYPE.GUEST]: guest,
  };

  // const hasAllRequiredCookies = requiredCookies.every(
  //   (cookie) => cookie in allCookies
  // );

  // console.log({ hasAllRequiredCookies, allCookies });

  // if (!hasAllRequiredCookies) {
  //   handleError({
  //     message:
  //       "You are not authorized to view this page. Please login to continue.",
  //   });
  //   redirect(PAGES.LOGIN);
  // }

  return view[userType];
}
