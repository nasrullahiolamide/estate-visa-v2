import { AxiosProgressEvent } from "axios";
import { divide, multiply, round, subtract } from "mathjs";
import { useState } from "react";

export interface Progress {
  time_left: number;
  completed: number;
}

export type OnUploadProgress = (progressEvent: AxiosProgressEvent) => void;

export function useOnUploadProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);

  const onUploadProgress: OnUploadProgress = async (progressEvent) => {
    const { loaded, total = 1 } = progressEvent;

    const percentageCompleted = round(divide(multiply(loaded, 100), total), 2);
    const remainingBytes = subtract(total, loaded);
    const timeLeftInSeconds = divide(remainingBytes, 360);

    setProgress?.({
      time_left: timeLeftInSeconds,
      completed: percentageCompleted,
    });
  };

  return {
    progress,
    setProgress,
    onUploadProgress,
  };
}
