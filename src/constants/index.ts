import { ForwardRefExoticComponent, RefAttributes } from "react";
import * as geoSirAgua from "./geography-sir-agua.ts";
import * as economics from "./economics.ts";
import * as history from "./history.ts";
import * as asian from "./asian.ts";
import { Question } from "./types.ts";
import {
  Icon,
  IconBook,
  IconGlobe,
  IconHistory,
  IconProps,
  IconReportMoney,
} from "@tabler/icons-react";

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
  {
    title: "World History",
    questions: history.questions,
    icon: IconHistory,
    color: "violet",
  },
  {
    title: "Asian Studies",
    questions: asian.questions,
    icon: IconBook,
    color: "blue",
  },
  {
    title: "Economics",
    questions: economics.questions,
    icon: IconReportMoney,
    color: "orange",
  },
];
