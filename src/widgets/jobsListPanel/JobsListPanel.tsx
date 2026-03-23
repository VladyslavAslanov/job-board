import { observer } from "mobx-react-lite";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { JobCard } from "@/entities/job/ui/JobCard";
import { formatResultsCount } from "@/shared/lib/format/jobs";
import styles from "./JobsListPanel.module.less";

interface JobsListPanelProps {
  openMobileModalOnSelect?: boolean;
}

export const JobsListPanel = observer(function JobsListPanel({
  openMobileModalOnSelect = false,
}: JobsListPanelProps) {
  const store = useJobBoardStore();

  if (store.isJobsLoading && store.jobs.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.count}>Loading jobs...</span>
        </div>

        <div className={styles.centerState}>Loading results...</div>
      </section>
    );
  }

  if (store.jobsError && store.jobs.length === 0) {
    return (
      <section className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.count}>Search results</span>
        </div>

        <div className={styles.centerState}>{store.jobsError}</div>
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

        <div className={styles.centerState}>No jobs found.</div>
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

      {store.isLoadingMore ? (
        <div className={styles.footerState}>Loading more jobs...</div>
      ) : null}

      {store.jobsError && store.jobs.length > 0 ? (
        <div className={styles.footerError}>{store.jobsError}</div>
      ) : null}
    </section>
  );
});
