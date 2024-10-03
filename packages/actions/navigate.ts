"use server";

import { redirect, RedirectType } from "next/navigation";

export async function navigate(url: string) {
  redirect(url, RedirectType.push);
}
