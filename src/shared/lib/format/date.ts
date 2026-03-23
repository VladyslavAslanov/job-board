import { getDefaultLocale } from "../utils/getDefaultLocale";

export function formatJobPostedDate(
  value: string,
  locale: string = getDefaultLocale()
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
