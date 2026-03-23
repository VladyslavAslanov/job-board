export type JobWorkArrangement = "on-site" | "hybrid" | "remote" | null;

export interface JobSalary {
  min: number | null;
  max: number | null;
  currency: string | null;
}

export interface JobListItem {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl: string | null;
  postedAt: string;
  locations: string[];
  workArrangement: JobWorkArrangement;
  salary: JobSalary;
  applyUrl: string;
}

export interface JobDetail extends JobListItem {
  descriptionHtml: string;
}

export interface JobsListPage {
  count: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  items: JobListItem[];
}

export interface JobSearchParams {
  query: string;
  country: string | null;
  limit: number;
  offset: number;
}
