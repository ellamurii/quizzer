import { ForwardRefExoticComponent, RefAttributes } from "react";
import * as geoSirAgua from "./geography-sir-agua.ts";
import { Question } from "./types.ts";
import { Icon, IconGlobe, IconProps } from "@tabler/icons-react";

export const topics: Array<{
  title: string;
  questions: Question[];
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  color: string;
}> = [
  {
    title: "Geography",
    questions: geoSirAgua.questions,
    icon: IconGlobe,
    color: "cyan",
  },
];
