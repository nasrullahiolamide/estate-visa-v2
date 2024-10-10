import {
  Anchor,
  Box,
  Breadcrumbs as IBreadcrumbs,
  BreadcrumbsProps as IBreadcrumbsProps,
} from "@mantine/core";
import { ReactNode } from "react";

import { BreadCrumbsArrowIcon } from "./bread-crumbs-arrow-icon";
import { BreadCrumbsHomeIcon } from "./bread-crumbs-home-icon";

import Link from "next/link";

export type Trail = {
  title: ReactNode;
  href?: string;
};

export interface BreadCrumbsProps extends Omit<IBreadcrumbsProps, "children"> {
  trail: Trail[];
}

export function BreadCrumbs({ trail }: BreadCrumbsProps) {
  return (
    <IBreadcrumbs
      separatorMargin={4}
      separator={<BreadCrumbsArrowIcon />}
      c="gray.4"
    >
      {trail.map(({ title, href }, index) => {
        return href ? (
          <Anchor
            key={index}
            component={Link}
            href={href}
            fz="sm"
            truncate
            maw={135}
            className="text-primary-text-caption"
          >
            {title === "Home" ? <BreadCrumbsHomeIcon /> : title}
          </Anchor>
        ) : (
          <Box
            key={index}
            fz={14}
            maw={135}
            // px={12}
            py={4}
            className="font-medium rounded-sm bg-primary-background-dark text-primary-text-subtle"
          >
            {title}
          </Box>
        );
      })}
    </IBreadcrumbs>
  );
}
