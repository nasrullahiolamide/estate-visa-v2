import type { Metadata } from "next";

import { PropsWithChildren } from "react";
import { Providers } from "@/components/shared";

import "@mantine/charts/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/tiptap/styles.css";
import "@mantine/spotlight/styles.layer.css";

import "react-toastify/dist/ReactToastify.css";

import "@/styles/accent.scss";
import "@/styles/index.css";
import "@/packages/variables/index.css";
import Script from "next/script";

type LayoutProps = PropsWithChildren<{}>;

export const metadata: Metadata = {
  title: "Estate Visa",
};

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>
        <main className='scrollbar-none'>
          <Providers>{children}</Providers>
        </main>
        <Script
          id='floating-btn_sdk'
          src='/scripts/floating-btn-sdk.js'
          strategy='afterInteractive'
          async
        />
      </body>
    </html>
  );
}
