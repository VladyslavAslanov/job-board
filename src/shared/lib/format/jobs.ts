import type { JobWorkArrangement } from "@/entities/job/model/job.model";
import { formatNumber } from "./number";
import { getDefaultLocale } from "../utils/getDefaultLocale";

export function formatResultsCount(
  count: number,
  locale: string = getDefaultLocale()
): string {
  const formattedCount = formatNumber(count, locale);
  const label = count === 1 ? "search result" : "search results";

  return `${formattedCount} ${label}`;
}

export function getWorkArrangementLabel(
  value: JobWorkArrangement
): string | null {
  switch (value) {
    case "on-site":
      return "On-site";
    case "hybrid":
      return "Hybrid";
    case "remote":
      return "Remote";
    default:
      return null;
  }
}

export function formatJobLocations(
  locations: string[] | null | undefined
): string | null {
  if (!locations || locations.length === 0) {
    return null;
  }

  const normalizedLocations = locations.filter(
    (location): location is string =>
      typeof location === "string" && location.trim().length > 0
  );

  if (normalizedLocations.length === 0) {
    return null;
  }

  return normalizedLocations.join(", ");
}
