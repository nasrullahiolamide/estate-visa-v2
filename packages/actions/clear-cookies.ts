"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function deleteCookie(cookie: RequestCookie) {
  const cookieStore = await cookies();
  cookieStore.delete(cookie);
}

export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach(deleteCookie);
}
