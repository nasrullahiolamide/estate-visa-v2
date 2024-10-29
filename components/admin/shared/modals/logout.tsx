"use client";
import { Fragment, useEffect, useState } from "react";

import { navigate } from "@/packages/actions";
import { PAGES, MODALS, handleLogout } from "@/packages/libraries";

import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";
import { handleError, handleSuccess } from "@/packages/notification";

export function ConfirmLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      try {
        const isLoggedOutResult = await handleLogout();
        if (isLoggedOutResult) {
          handleSuccess({ message: "You have been successfully logged out." });
          navigate(PAGES.LOGIN);
          modals.close(MODALS.CONFIRMATION);
          setIsLoggingOut(false);
        }
      } catch (error) {
        handleError({ message: "An error occurred while logging out." });
        setIsLoggingOut(false);
      }
    };

    isLoggingOut && performLogout();
  }, [isLoggingOut]);

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        title='Are you sure you want to sign out of your account?'
        src='logout'
        primaryBtnText='Sign Out'
        secondaryBtnText='Stay Logged Out'
        secondaryBtnProps={{
          disabled: isLoggingOut,
        }}
        primaryBtnProps={{
          color: "red",
          loading: isLoggingOut,
          disabled: isLoggingOut,
          onClick: () => setIsLoggingOut(true),
        }}
      />
    </Fragment>
  );
}
