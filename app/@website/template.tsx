"use client";
import { PropsWithChildren, useEffect } from "react";
import AOS from "aos";

type LayoutProps = PropsWithChildren<{}>;

export default function Template({ children }: LayoutProps) {
  useEffect(() => {
    document.documentElement.style.opacity = "1";

    AOS.init({
      easing: "ease-in-out-sine",
      once: true,
    });
  }, []);

  return children;
}
