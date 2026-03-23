import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { SearchBar } from "@/widgets/searchBar/SearchBar";
import styles from "./JobBoardPage.module.less";

export const JobBoardPage = observer(function JobBoardPage() {
  const store = useJobBoardStore();

  useEffect(() => {
    void store.loadCountries();
  }, [store]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.searchBarArea}>
          <SearchBar autoSelectFirstJob />
        </section>

        <section className={styles.resultsMeta}>
          <span>{store.jobsCount.toLocaleString()} search results</span>
        </section>

        <section className={styles.content}>
          <div className={styles.listPlaceholder}>
            <p>Jobs list placeholder</p>

            <div className={styles.statusBlock}>
              <p>Countries loading: {String(store.isCountriesLoading)}</p>
              <p>Countries count: {store.countries.length}</p>
              <p>Countries error: {store.countriesError ?? "none"}</p>
              <p>Jobs loading: {String(store.isJobsLoading)}</p>
              <p>Jobs count: {store.jobsCount}</p>
            </div>
          </div>

          <aside className={styles.detailPlaceholder}>
            <p>Job detail placeholder</p>
          </aside>
        </section>
      </div>
    </main>
  );
});
