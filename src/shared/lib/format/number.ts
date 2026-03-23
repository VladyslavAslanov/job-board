import { getDefaultLocale } from "../utils/getDefaultLocale";

export function formatNumber(
  value: number,
  locale: string = getDefaultLocale()
): string {
  return new Intl.NumberFormat(locale).format(value);
}
