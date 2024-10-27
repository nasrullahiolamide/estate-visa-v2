import type { Metadata } from "next";

import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "@/components/shared";
import { getUserType } from "@/packages/actions";
import { USER_TYPE } from "@/packages/libraries";

import "@mantine/charts/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/tiptap/styles.css";
import "@mantine/spotlight/styles.layer.css";

import "react-toastify/dist/ReactToastify.css";

import "@/styles/accent.scss";
import "@/styles/index.css";
import "@/packages/variables/index.css";

type LayoutProps = PropsWithChildren<{
  admin: ReactNode;
  super_admin: ReactNode;
  occupant: ReactNode;
  sub_occupant: ReactNode;
  property_owner: ReactNode;
  gateman: ReactNode;
  website: ReactNode;
}>;

export const metadata: Metadata = {
  title: "Estate Visa",
};

export default async function RootLayout({
  admin,
  super_admin,
  occupant,
  sub_occupant,
  property_owner,
  gateman,
  website,
  children,
}: LayoutProps) {
  const userType = await getUserType();
  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.OCCUPANT]: occupant,
    [USER_TYPE.SUB_OCCUPANT]: sub_occupant,
    [USER_TYPE.PROPERTY_OWNER]: property_owner,
    [USER_TYPE.GATEMAN]: gateman,
    [USER_TYPE.GUEST]: website,
  };

  return (
    <html lang='en'>
      <body>
        <main className='scrollbar-none'>
          <Providers>
            {children}
            {view[userType]}
          </Providers>
        </main>
      </body>
    </html>
  );
}
