export interface CountryOption {
  value: string;
  label: string;
}

export interface JobSearchParams {
  query: string;
  country: string | null;
  limit: number;
  offset: number;
}
