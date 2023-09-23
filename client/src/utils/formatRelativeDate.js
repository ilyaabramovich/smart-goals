import { rtf } from "../utils/relativeTimeFormatter";

export function formatRelativeDate(value, unit = "days") {
  if (value === 0) {
    return "today";
  }

  return rtf.format(value, unit);
}
