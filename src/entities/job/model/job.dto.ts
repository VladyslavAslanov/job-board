export type JobWorkArrangementDto = "on-site" | "hybrid" | "remote" | null;

export interface JobPostBaseDto {
  id: string;
  title: string;
  organization: string;
  organization_logo: string | null;
  date_posted: string;
  locations_derived: string[];
  ai_work_arrangement: JobWorkArrangementDto;
  ai_salary_minvalue: number | null;
  ai_salary_maxvalue: number | null;
  ai_salary_currency: string | null;
  url: string;
}

export type JobPostListItemDto = JobPostBaseDto;

export interface JobPostDetailDto extends JobPostBaseDto {
  description_html: string;
}

export interface JobPostsListResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobPostListItemDto[];
}
