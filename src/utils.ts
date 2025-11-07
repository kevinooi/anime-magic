import cn from "classnames";
import { twMerge } from "tailwind-merge";

export default function classNames(...args: cn.ArgumentArray): string {
  return twMerge(cn(...args));
}
