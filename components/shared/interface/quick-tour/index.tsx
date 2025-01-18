import { APP, USER_TYPE } from "@/packages/libraries";
import { Config, driver, DriveStep } from "driver.js";
import { useEffect } from "react";

interface QuickTourProps extends Config {
  steps: DriveStep[];
  onComplete?: () => void;
  profile:
    | USER_TYPE.ADMIN
    | USER_TYPE.GATEMAN
    | USER_TYPE.OCCUPANT
    | USER_TYPE.PROPERTY_OWNER
    | USER_TYPE.SUB_OCCUPANT
    | USER_TYPE.SUB_ADMIN
    | USER_TYPE.SUPER_ADMIN;
  feature: string;
}

export function QuickTour({
  steps,
  onComplete,
  profile,
  feature,
  ...props
}: QuickTourProps) {
  useEffect(() => {
    const storageKey = APP.HAS_COMPLETED_TOUR;

    const storedData = JSON.parse(localStorage.getItem(storageKey) || "{}");

    if (storedData[profile]?.[feature]) return;

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

    driverObj.drive();

    return () => {
      driverObj.refresh();
    };
  }, [steps, onComplete, profile, feature, props]);

  return null;
}
