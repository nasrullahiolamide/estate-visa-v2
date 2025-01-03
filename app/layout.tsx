import type { Metadata } from "next";

import { Providers } from "@/components/shared";
import { PropsWithChildren } from "react";

import "@mantine/charts/styles.layer.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "@mantine/spotlight/styles.layer.css";
import "@mantine/tiptap/styles.css";

import "react-international-phone/style.css";
import "react-toastify/dist/ReactToastify.css";

import "@/packages/variables/index.css";
import "@/styles/accent.scss";
import "@/styles/index.css";

import "aos/dist/aos.css";

export const metadata: Metadata = {
  title: "Estate Visa",
};

type LayoutProps = PropsWithChildren<{}>;

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body>
        <main className='scrollbar-none'>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
