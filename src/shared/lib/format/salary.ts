import type { JobSalary } from "@/entities/job/model/job.model";

function getDefaultLocale() {
  return navigator.language || "en-US";
}

export function formatSalaryRange(
  salary: JobSalary,
  locale: string = getDefaultLocale()
): string | null {
  const { min, max, currency } = salary;

  if (min == null && max == null) {
    return null;
  }

  let numberFormatter: Intl.NumberFormat;

  try {
    numberFormatter = new Intl.NumberFormat(locale, {
      style: currency ? "currency" : "decimal",
      currency: currency || undefined,
      maximumFractionDigits: 0,
    });
  } catch {
    numberFormatter = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    });
  }

  if (min != null && max != null) {
    return `${numberFormatter.format(min)} - ${numberFormatter.format(max)}`;
  }

  if (min != null) {
    return `From ${numberFormatter.format(min)}`;
  }

  return `Up to ${numberFormatter.format(max as number)}`;
}
