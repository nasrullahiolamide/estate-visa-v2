import { pathToRegexp } from "path-to-regexp";

export const matchesRoute = (route: string, pattern: string) => {
  return pathToRegexp(pattern).regexp.test(route);
};
