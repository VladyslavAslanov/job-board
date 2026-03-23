import { makeAutoObservable, runInAction } from "mobx";
import { getCountries } from "@/entities/country/api/country.service";
import {
  getJobPostById,
  getJobPosts,
  getJobPostsByUrl,
} from "@/entities/job/api/job.service";
import type { CountryOption } from "@/entities/country/model/country.model";
import type { JobDetail, JobListItem } from "@/entities/job/model/job.model";
import { getApiErrorMessage } from "@/shared/api/api.errors";

const DEFAULT_LIMIT = 20;

export class JobBoardStore {
  countries: CountryOption[] = [];

  queryDraft = "";
  selectedCountryDraft: string | null = null;

  appliedQuery = "";
  appliedCountry: string | null = null;

  jobs: JobListItem[] = [];
  jobsCount = 0;
  nextPageUrl: string | null = null;

  selectedJobId: string | null = null;
  selectedJobDetail: JobDetail | null = null;

  isCountriesLoading = false;
  isJobsLoading = false;
  isLoadingMore = false;
  isJobDetailLoading = false;

  countriesError: string | null = null;
  jobsError: string | null = null;
  jobDetailError: string | null = null;

  isMobileDetailOpen = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setQueryDraft(value: string) {
    this.queryDraft = value;
  }

  setSelectedCountryDraft(value: string | null) {
    this.selectedCountryDraft = value;
  }

  async loadCountries() {
    this.isCountriesLoading = true;
    this.countriesError = null;

    try {
      const countries = await getCountries();

      runInAction(() => {
        this.countries = countries;
      });
    } catch (error) {
      runInAction(() => {
        this.countriesError = getApiErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isCountriesLoading = false;
      });
    }
  }

  async submitSearch(options?: { autoSelectFirstJob?: boolean }) {
    if (this.isJobsLoading) {
      return;
    }

    this.appliedQuery = this.queryDraft.trim();
    this.appliedCountry = this.selectedCountryDraft;

    this.jobs = [];
    this.jobsCount = 0;
    this.nextPageUrl = null;

    this.selectedJobId = null;
    this.selectedJobDetail = null;
    this.isJobDetailLoading = false;

    this.jobsError = null;
    this.jobDetailError = null;
    this.isMobileDetailOpen = false;

    await this.loadInitialJobs(options);
  }

  async loadInitialJobs(options?: { autoSelectFirstJob?: boolean }) {
    this.isJobsLoading = true;
    this.jobsError = null;

    try {
      const page = await getJobPosts({
        query: this.appliedQuery,
        country: this.appliedCountry,
        limit: DEFAULT_LIMIT,
        offset: 0,
      });

      runInAction(() => {
        this.jobs = page.items;
        this.jobsCount = page.count;
        this.nextPageUrl = page.nextPageUrl;
      });

      if (options?.autoSelectFirstJob && page.items.length > 0) {
        await this.selectJob(page.items[0].id);
      }
    } catch (error) {
      runInAction(() => {
        this.jobsError = getApiErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isJobsLoading = false;
      });
    }
  }

  async loadMoreJobs() {
    if (!this.nextPageUrl || this.isLoadingMore || this.isJobsLoading) {
      return;
    }

    this.isLoadingMore = true;
    this.jobsError = null;

    try {
      const page = await getJobPostsByUrl(this.nextPageUrl);

      runInAction(() => {
        this.jobs = [...this.jobs, ...page.items];
        this.jobsCount = page.count;
        this.nextPageUrl = page.nextPageUrl;
      });
    } catch (error) {
      runInAction(() => {
        this.jobsError = getApiErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoadingMore = false;
      });
    }
  }

  async selectJob(jobId: string, options?: { openMobileModal?: boolean }) {
    if (this.selectedJobId === jobId && this.selectedJobDetail?.id === jobId) {
      if (options?.openMobileModal) {
        this.isMobileDetailOpen = true;
      }

      return;
    }

    this.selectedJobId = jobId;
    this.selectedJobDetail = null;
    this.jobDetailError = null;

    if (options?.openMobileModal) {
      this.isMobileDetailOpen = true;
    }

    await this.loadSelectedJobDetail(jobId);
  }

  async loadSelectedJobDetail(jobId: string) {
    this.isJobDetailLoading = true;
    this.jobDetailError = null;

    try {
      const detail = await getJobPostById(jobId);

      runInAction(() => {
        if (this.selectedJobId !== jobId) {
          return;
        }

        this.selectedJobDetail = detail;
      });
    } catch (error) {
      runInAction(() => {
        if (this.selectedJobId !== jobId) {
          return;
        }

        this.jobDetailError = getApiErrorMessage(error);
      });
    } finally {
      runInAction(() => {
        if (this.selectedJobId !== jobId) {
          return;
        }

        this.isJobDetailLoading = false;
      });
    }
  }

  openMobileDetail() {
    if (this.selectedJobId) {
      this.isMobileDetailOpen = true;
    }
  }

  closeMobileDetail() {
    this.isMobileDetailOpen = false;
  }
}
