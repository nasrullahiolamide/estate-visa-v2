import { NextURL } from "next/dist/server/web/next-url";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";

// DEBUGGER
const uniqueID = Math.random().toString(36).slice(2, 6);

/**
 * A logger function to log messages to the console.
 *
 * @param nextUrl The URL object.
 * @param messages The messages to be logged.
 *
 * @returns void
 */
function logger(nextUrl: NextURL, ...messages: any[]) {
  if (process.env.DEBUG_MIDDLEWARE === "true") {
    const path = `: === ${nextUrl.pathname}`;
    const prefix = messages.length ? `${uniqueID}:` : path;
    console.log(prefix, ...messages);
  }
}

/**
 * Redirect to a specific page.
 *
 * @param nextUrl The URL object.
 * @param next The page to redirect to.
 *
 * @returns A NextResponse object.
 */
function redirect(nextUrl: NextURL, next: string, ...messages: string[]) {
  logger(nextUrl, ...messages);

  nextUrl.pathname = next;
  return NextResponse.redirect(nextUrl, {
    headers: { "x-middleware-cache": "no-cache" },
  });
}

/**
 * Forward to the next middleware.
 * @param messages The messages to be logged.
 * @returns A NextResponse object.
 */
function forward(nextUrl: NextURL, ...messages: string[]) {
  logger(nextUrl, ...messages);

  return NextResponse.next();
}

/**
 * Check if the user is authorized.
 * @param request The incoming request object.
 * @returns boolean
 */
// function isAuthorized(request: NextRequest): boolean {
//   const cookies = request.cookies.getAll();
//   const hasToken = cookies.find(
//     (cookie) =>
//       cookie.name === TOKEN.HEADER ||
//       cookie.name === TOKEN.PAYLOAD ||
//       cookie.name === TOKEN.SIGNATURE
//   );

//   return !!hasToken;
// }

// MIDDLEWARE
export const middleware: NextMiddleware = (request: NextRequest) => {
  const { nextUrl } = request;
  const { pathname, searchParams } = nextUrl;

  return forward(nextUrl, "authorized user");
};

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next
   * - | static (static files)
   * - | image (image optimization files)
   * - | data (json files)
   * - api (API routes)
   *
   * Also, skip all files ending with an extension
   * - favicon.ico (favicon file)
   * - public (assets)
   *
   * Skip middleware for all requests that are not GET requests.
   * @link https://github.com/vercel/next.js/discussions/38216
   *
   * Middleware will be executed for all requests, including _next
   * @link https://nextjs.org/docs/messages/middleware-upgrade-guide#executing-middleware-on-internal-nextjs-requests
   */
  matcher: "/((?!api|_next|.*\\..*).*)",
};
