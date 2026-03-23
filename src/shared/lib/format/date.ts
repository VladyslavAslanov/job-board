function getDefaultLocale() {
  return navigator.language || "en-US";
}

function formatAbsoluteDate(
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

export function formatJobPostedDate(
  value: string,
  locale: string = getDefaultLocale()
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "recently";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs <= 0) {
    return "today";
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor(diffMs / dayMs);

  if (diffDays <= 0) {
    return "today";
  }

  if (diffDays >= 1 && diffDays <= 6) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  if (diffDays >= 7 && diffDays <= 13) {
    return "over a week ago";
  }

  return formatAbsoluteDate(value, locale);
}
