import pathMatch, { Options } from "path-match";

interface GetRouteTokens {
  route: string;
  pattern: string;
  params?: Record<string, string>;
  options?: Options;
}

export const getRouteTokens = (props: GetRouteTokens) => {
  const { route, pattern, params = {}, options } = props;
  const tokens = pathMatch(options)(pattern);
  return tokens(route, params);
};
