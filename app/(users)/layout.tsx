import { getAuthorizedUser } from "@/packages/actions";
import { USER_TYPE } from "@/packages/libraries";
import { redirect } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

type LayoutProps = PropsWithChildren<{
  admin: ReactNode;
  sub_admin: ReactNode;
  super_admin: ReactNode;
  occupant: ReactNode;
  sub_occupant: ReactNode;
  property_owner: ReactNode;
  gateman: ReactNode;
  guest: ReactNode;
}>;

export default async function Layout({
  admin,
  sub_admin,
  super_admin,
  occupant,
  sub_occupant,
  property_owner,
  gateman,
  guest = null,
}: LayoutProps) {
  const { isAuthorized, userType, callbackUrl } = await getAuthorizedUser();

  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUB_ADMIN]: sub_admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.OCCUPANT]: occupant,
    [USER_TYPE.SUB_OCCUPANT]: sub_occupant,
    [USER_TYPE.PROPERTY_OWNER]: property_owner,
    [USER_TYPE.GATEMAN]: gateman,
  };

  if (!isAuthorized) redirect(callbackUrl);

  return isAuthorized ? view[userType] : guest;
}
