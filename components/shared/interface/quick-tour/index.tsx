import { APP } from "@/packages/libraries";
import { Config, driver, DriveStep } from "driver.js";
import { useEffect } from "react";

interface QuickTourProps extends Config {
  steps?: DriveStep[];
  onComplete?: () => void;
  storageKey?: string;
}

export function QuickTour({
  steps,
  onComplete,
  storageKey = APP.HAS_COMPLETED_TOUR,
  ...props
}: QuickTourProps) {
  useEffect(() => {
    const isTourCompleted = localStorage.getItem(storageKey);

    if (isTourCompleted) return;

    const driverObj = driver({
      showProgress: true,
      steps,
      onDestroyed: () => {
        localStorage.setItem(storageKey, "true");
        if (onComplete) onComplete();
      },
      ...props,
    });

    driverObj.drive();
  }, []);

  return null;
}
