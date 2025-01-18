"use client";

import { APP, USER_TYPE } from "@/packages/libraries";
import { Config, driver, DriveStep } from "driver.js";
import { useEffect } from "react";

interface QuickTourProps extends Config {
  steps: DriveStep[];
  feature: string;
  onComplete?: () => void;
  restart?: boolean;
  profile:
    | USER_TYPE.ADMIN
    | USER_TYPE.GATEMAN
    | USER_TYPE.OCCUPANT
    | USER_TYPE.PROPERTY_OWNER
    | USER_TYPE.SUB_OCCUPANT
    | USER_TYPE.SUB_ADMIN
    | USER_TYPE.SUPER_ADMIN;
}

export function QuickTour({
  steps,
  onComplete,
  profile,
  feature,
  restart,
  ...props
}: QuickTourProps) {
  const storageKey = APP.HAS_COMPLETED_TOUR;
  const storedData = JSON.parse(localStorage.getItem(storageKey) || "{}");

  const driverObj = driver({
    showProgress: true,
    steps,
    onDestroyed: () => {
      const updatedData = {
        ...storedData,
        [profile]: {
          ...storedData[profile],
          [feature]: "true",
        },
      };

      localStorage.setItem(storageKey, JSON.stringify(updatedData));

      if (onComplete) onComplete();
    },
    ...props,
  });

  useEffect(() => {
    if (storedData[profile]?.[feature]) return;
    else driverObj.drive();
  }, []);

  useEffect(() => {
    driverObj.drive();
  }, [restart]);

  return null;
}
