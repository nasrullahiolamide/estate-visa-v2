"use client";

import { ConfirmationModal } from "@/components/shared/interface";
import { clearCookies, navigate } from "@/packages/actions";
import { MODALS, PAGES } from "@/packages/libraries";
import { handleSuccess } from "@/packages/notification";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

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
        src="exit"
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
