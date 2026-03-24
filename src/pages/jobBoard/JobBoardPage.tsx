import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import styles from "./JobBoardPage.module.less";
import { SearchBar } from "@/widgets/searchBar/SearchBar";
import { JobsListPanel } from "@/widgets/jobsListPanel/JobsListPanel";
import { JobDetailPanel } from "@/widgets/jobDetailPanel/JobDetailPanel";
import { MobileJobDetailModal } from "@/widgets/mobileJobDetailModal/MobileJobDetailModal";

export const JobBoardPage = observer(function JobBoardPage() {
  const store = useJobBoardStore();
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;

    void store.loadCountries();
    void store.submitSearch({ autoSelectFirstJob: !isMobile });
  }, [isMobile, store]);

  useEffect(() => {
    if (!isMobile) {
      store.closeMobileDetail();
    }
  }, [isMobile, store]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.searchBarArea}>
          <SearchBar autoSelectFirstJob={!isMobile} />
        </section>

        <section className={styles.content}>
          <div className={styles.listColumn}>
            <JobsListPanel openMobileModalOnSelect={isMobile} />
          </div>

          {!isMobile ? (
            <aside className={styles.detailColumn}>
              <JobDetailPanel />
            </aside>
          ) : null}
        </section>
      </div>

      {isMobile ? <MobileJobDetailModal /> : null}
    </main>
  );
});
