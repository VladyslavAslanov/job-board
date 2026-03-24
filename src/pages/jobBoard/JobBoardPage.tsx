import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { SearchBar } from "@/widgets/searchBar/SearchBar";
import { JobsListPanel } from "@/widgets/jobsListPanel/JobsListPanel";
import { JobDetailPanel } from "@/widgets/jobDetailPanel/JobDetailPanel";
import styles from "./JobBoardPage.module.less";

export const JobBoardPage = observer(function JobBoardPage() {
  const store = useJobBoardStore();

  useEffect(() => {
    void store.loadCountries();
    void store.submitSearch({ autoSelectFirstJob: true });
  }, [store]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.searchBarArea}>
          <SearchBar autoSelectFirstJob />
        </section>

        <section className={styles.content}>
          <div className={styles.listColumn}>
            <JobsListPanel />
          </div>

          <aside className={styles.detailColumn}>
            <JobDetailPanel />
          </aside>
        </section>
      </div>
    </main>
  );
});
