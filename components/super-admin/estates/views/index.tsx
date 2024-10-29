export { DesktopView } from "./desktop";
export { MobileView } from "./mobile";

export type ViewProps = {
  onSubmit?: (props: any) => void;
  isSubmitting: boolean;
  btnText?: string;
};
