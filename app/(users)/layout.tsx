import { PropsWithChildren, ReactNode } from "react";
import { getUserType } from "@/packages/actions";
import { USER_TYPE } from "@/packages/libraries";

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

  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.OCCUPANT]: occupant,
    [USER_TYPE.SUB_OCCUPANT]: sub_occupant,
    [USER_TYPE.PROPERTY_OWNER]: property_owner,
    [USER_TYPE.GATEMAN]: gateman,
    [USER_TYPE.GUEST]: guest,
  };

  return view[userType];
}
