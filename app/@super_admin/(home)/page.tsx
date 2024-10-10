import { navigate } from "@/packages/actions";
import { PAGES } from "@/packages/libraries";

export default function Page() {
  navigate(PAGES.OVERVIEW);
  return null;
}
