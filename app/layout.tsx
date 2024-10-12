import type { Metadata } from "next";

import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "@/components/shared";
import { getUserType } from "@/packages/actions";
import { USER_TYPE } from "@/packages/libraries";

import "@mantine/charts/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";

import "@/styles/accent.scss";
import "@/styles/index.css";
import "@/packages/variables/index.css";

import clsx from "clsx";

type LayoutProps = PropsWithChildren<{
  admin: ReactNode;
  super_admin: ReactNode;
  website: ReactNode;
}>;

export const metadata: Metadata = {
  title: "Estate Visa",
};

export default async function RootLayout({
  admin,
  super_admin,
  website,
  children,
}: LayoutProps) {
  const userType = await getUserType();
  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.GUEST]: website,
  };

  return (
    <html lang='en'>
      <body>
        <main className={clsx("scrollbar-none")}>
          <Providers>
            {children}
            {/* {view[userType]} */}
            {admin}
            {/* {super_admin} */}
            {/* {website} */}
          </Providers>
        </main>
      </body>
    </html>
  );
}
