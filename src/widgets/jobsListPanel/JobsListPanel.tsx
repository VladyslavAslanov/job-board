import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { JobCard } from "@/entities/job/ui/JobCard";
import { formatResultsCount } from "@/shared/lib/format/jobs";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";
import styles from "./JobsListPanel.module.less";

interface JobsListPanelProps {
  openMobileModalOnSelect?: boolean;
}

export const JobsListPanel = observer(function JobsListPanel({
  openMobileModalOnSelect = false,
}: JobsListPanelProps) {
  const store = useJobBoardStore();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: loadMoreRef.current,
    enabled:
      !!store.nextPageUrl &&
      !store.isJobsLoading &&
      !store.isLoadingMore &&
      store.jobs.length > 0,
    onIntersect: () => {
      void store.loadMoreJobs();
    },
  });

  if (store.isJobsLoading && store.jobs.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.count}>Loading jobs...</span>
        </div>

        <div className={styles.centerState} aria-live="polite">
          Loading results...
        </div>
      </section>
    );
  }

  if (store.jobsError && store.jobs.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.count}>Search results</span>
        </div>

        <div className={styles.centerState} aria-live="polite">
          {store.jobsError}
        </div>
      </section>
    );
  }

  if (!store.isJobsLoading && store.jobs.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.count}>
            {formatResultsCount(store.jobsCount)}
          </span>
        </div>

        <div className={styles.centerState} aria-live="polite">
          No jobs found.
        </div>
      </section>
    );
  }

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.count}>
          {formatResultsCount(store.jobsCount)}
        </span>
      </div>

      <div className={styles.list}>
        {store.jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={store.selectedJobId === job.id}
            onClick={() =>
              void store.selectJob(job.id, {
                openMobileModal: openMobileModalOnSelect,
              })
            }
          />
        ))}
      </div>

      <div
        ref={loadMoreRef}
        className={styles.loadMoreSentinel}
        aria-hidden="true"
      />

      {store.isLoadingMore ? (
        <div className={styles.footerState} aria-live="polite">
          Loading more jobs...
        </div>
      ) : null}

      {!store.nextPageUrl && store.jobs.length > 0 ? (
        <div className={styles.footerState}>
          You’ve reached the end of the results.
        </div>
      ) : null}

      {store.jobsError && store.jobs.length > 0 ? (
        <div className={styles.centerState} aria-live="polite">
          {store.jobsError}
        </div>
      ) : null}
    </section>
  );
});
