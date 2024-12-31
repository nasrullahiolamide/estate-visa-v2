declare module "path-match" {
  import { ParseOptions, Path, TokensToRegexpOptions } from "path-to-regexp";

  export type Options = TokensToRegexpOptions & ParseOptions;

  interface Params {
    [key: string]: string;
  }

  type MatchFunction = (pathname: string, params?: Params) => Params;

  interface PathMatch {
    (path: Path): MatchFunction;
  }

  export default function pathMatch(options?: Options): PathMatch;
}
