"use client";
import { Fragment } from "react";

import { clearCookies, navigate } from "@/packages/actions";
import { PAGES, MODALS } from "@/packages/libraries";

import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";
import { handleSuccess } from "@/packages/notification";
import { useRouter } from "next/navigation";

export function ConfirmLogout() {
  const { refresh } = useRouter();

  const handleLogout = () => {
    clearCookies();
    navigate(PAGES.LOGIN);
    refresh();
    modals.close(MODALS.CONFIRMATION);
    handleSuccess({
      message: "You have been successfully logged out.",
    });
  };

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        title="Are you sure you want to sign out of your account?"
        src="logout"
        primaryBtnText="Sign Out"
        secondaryBtnText="Stay"
        srcProps={{
          ml: 0,
        }}
        primaryBtnProps={{
          color: "red",
          component: "a",
          onClick: handleLogout,
        }}
      />
    </Fragment>
  );
}
