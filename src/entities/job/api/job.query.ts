import type { JobSearchParams } from "../model/job.model";

export function buildJobPostsSearchParams(
  params: JobSearchParams
): URLSearchParams {
  const searchParams = new URLSearchParams();

  const trimmedQuery = params.query.trim();

  if (trimmedQuery) {
    searchParams.set("q", trimmedQuery);
  }

  if (params.country) {
    searchParams.append("country", params.country);
  }

  searchParams.set("limit", String(params.limit));
  searchParams.set("offset", String(params.offset));

  return searchParams;
}
