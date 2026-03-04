import { JSX, SVGProps } from "react";

export type IconType = ({ ...props }: SVGProps<SVGSVGElement>) => JSX.Element;
