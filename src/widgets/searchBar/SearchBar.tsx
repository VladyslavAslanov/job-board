import { observer } from "mobx-react-lite";
import type { KeyboardEventHandler } from "react";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { CountrySelect } from "@/features/countryFilter/ui/CountrySelect";
import styles from "./SearchBar.module.less";

interface SearchBarProps {
  autoSelectFirstJob?: boolean;
}

export const SearchBar = observer(function SearchBar({
  autoSelectFirstJob = false,
}: SearchBarProps) {
  const store = useJobBoardStore();

  const titleQuery = store.appliedQuery || store.queryDraft || "all";
  const titleText =
    titleQuery === "all"
      ? "Results for all jobs"
      : `Results for ${titleQuery} jobs`;

  const handleSubmit = async () => {
    await store.submitSearch({ autoSelectFirstJob });
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <section className={styles.searchSection} aria-label="Job search section">
      <h1 className={styles.title}>{titleText}</h1>

      <div className={styles.searchPanel}>
        <div className={styles.searchInputSlot}>
          <span className={styles.searchIcon} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 16L20 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <input
            id="job-search-input"
            className={styles.input}
            type="text"
            placeholder="Job title, company, or skill"
            value={store.queryDraft}
            onChange={(event) => store.setQueryDraft(event.target.value)}
            onKeyDown={handleInputKeyDown}
            aria-label="Search jobs by keyword"
          />
        </div>

        <div className={styles.countrySlot}>
          <CountrySelect
            id="country-select-trigger"
            value={store.selectedCountryDraft}
            options={store.countries}
            isLoading={store.isCountriesLoading}
            error={store.countriesError}
            onChange={store.setSelectedCountryDraft}
          />
        </div>

        <div className={styles.buttonSlot}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSubmit}
            disabled={store.isJobsLoading}
            aria-label="Search jobs"
          >
            {store.isJobsLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </section>
  );
});
