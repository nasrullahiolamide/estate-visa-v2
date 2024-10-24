import { Fragment } from "react";

import { navigate } from "@/packages/actions";
import { PAGES, MODALS } from "@/packages/libraries";

import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";

export function ConfirmLogout() {
  const handleLogout = () => {
    navigate(PAGES.LOGOUT);
    modals.close(MODALS.CONFIRM_LOGOUT);
  };

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        title='Are you sure you want to sign out of your account?'
        src='logout'
        primaryBtnText='Sign Out'
        secondaryBtnText='Stay Logged Out'
        primaryBtnProps={{
          color: "red",
          onClick: handleLogout,
        }}
      />
    </Fragment>
  );
}
