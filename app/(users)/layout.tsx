import { USER_TYPE } from "@/packages/libraries";
import { PropsWithChildren, ReactNode } from "react";

import { getAuthorizedUser } from "@/packages/actions";

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

export default async function RootLayout({
  admin,
  sub_admin,
  super_admin,
  occupant,
  sub_occupant,
  property_owner,
  gateman,
}: LayoutProps) {
  const { isAuthorized, userType } = await getAuthorizedUser();

  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUB_ADMIN]: sub_admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.OCCUPANT]: occupant,
    [USER_TYPE.SUB_OCCUPANT]: sub_occupant,
    [USER_TYPE.PROPERTY_OWNER]: property_owner,
    [USER_TYPE.GATEMAN]: gateman,
  };

  return isAuthorized ? view[userType] : null;
}
