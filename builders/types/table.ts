import { ReactNode } from "react";

export type Actionable<T> = T & { action: ReactNode };
