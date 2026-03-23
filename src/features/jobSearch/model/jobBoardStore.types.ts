import type { CountryOption } from "@/entities/country/model/country.model";
import type { JobDetail, JobListItem } from "@/entities/job/model/job.model";

export interface JobBoardStoreState {
  countries: CountryOption[];

  queryDraft: string;
  selectedCountryDraft: string | null;

  appliedQuery: string;
  appliedCountry: string | null;

  jobs: JobListItem[];
  jobsCount: number;
  nextPageUrl: string | null;

  selectedJobId: string | null;
  selectedJobDetail: JobDetail | null;

  isCountriesLoading: boolean;
  isJobsLoading: boolean;
  isLoadingMore: boolean;
  isJobDetailLoading: boolean;

  countriesError: string | null;
  jobsError: string | null;
  jobDetailError: string | null;

  isMobileDetailOpen: boolean;
}
