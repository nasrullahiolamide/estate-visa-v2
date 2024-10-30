"use client";
import { Fragment, useEffect, useState } from "react";

import { clearCookies, navigate } from "@/packages/actions";
import { PAGES, MODALS, handleLogout } from "@/packages/libraries";

import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";
import { handleError, handleSuccess } from "@/packages/notification";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ConfirmLogout() {
  // const [isLoggingOut, setIsLoggingOut] = useState(false);

  // useEffect(() => {
  //   const performLogout = async () => {
  //     try {
  //       const isLoggedOutResult = await handleLogout();
  //       if (isLoggedOutResult) {
  //         handleSuccess({ message: "You have been successfully logged out." });
  //         navigate(PAGES.LOGIN);
  //         modals.close(MODALS.CONFIRMATION);
  //         setIsLoggingOut(false);
  //       }
  //     } catch (error) {
  //       handleError({ message: "An error occurred while logging out." });
  //       setIsLoggingOut(false);
  //     }
  //   };

  //   isLoggingOut && performLogout();
  // }, [isLoggingOut]);

  const { refresh } = useRouter();

  const handleLogOut = () => {
    clearCookies();
    navigate(PAGES.WEBSITE);
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
        title='Are you sure you want to sign out of your account?'
        src='logout'
        primaryBtnText='Sign Out'
        secondaryBtnText='Stay Logged Out'
        primaryBtnProps={{
          color: "red",
          component: "a",
          onClick: handleLogOut,
        }}
      />
    </Fragment>
  );
}
