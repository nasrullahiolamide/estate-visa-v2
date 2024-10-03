import type { Metadata } from "next";

import { PropsWithChildren, ReactNode } from "react";

import "@mantine/charts/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";

import "@/styles/accent.scss";
import "@/styles/index.css";

import { Providers } from "@/components/shared";
import { getUserType } from "@/packages/actions";
import { USER_TYPE } from "@/packages/libraries";

import clsx from "clsx";

type LayoutProps = PropsWithChildren<{
  children: ReactNode;
  admin: ReactNode;
  super_admin: ReactNode;
  website: ReactNode;
}>;

export const metadata: Metadata = {
  title: "Estate Visa",
};

export default async function RootLayout({
  children,
  admin,
  super_admin,
  website,
}: LayoutProps) {
  const userType = await getUserType();

  const view: Record<PropertyKey, ReactNode> = {
    [USER_TYPE.ADMIN]: admin,
    [USER_TYPE.SUPER_ADMIN]: super_admin,
    [USER_TYPE.GUEST]: admin,
  };

  return (
    <html lang='en'>
      <body>
        <main className={clsx("scrollbar-none")}>
          <Providers>
            {children}
            {view[userType]}
          </Providers>
        </main>
      </body>
    </html>
  );
}
