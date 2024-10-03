"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function deleteCookie(cookie: RequestCookie) {
  const cookieStore = cookies();
  cookieStore.delete(cookie);
}

export async function clearCookies() {
  const cookieStore = cookies();
  cookieStore.getAll().forEach(deleteCookie);
}
