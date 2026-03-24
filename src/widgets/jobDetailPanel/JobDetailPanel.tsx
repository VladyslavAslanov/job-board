import { observer } from "mobx-react-lite";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { JobDetailContent } from "@/entities/job/ui/JobDetailContent";
import styles from "./JobDetailPanel.module.less";

export const JobDetailPanel = observer(function JobDetailPanel() {
  const store = useJobBoardStore();

  if (!store.selectedJobId && !store.isJobDetailLoading) {
    return (
      <section className={styles.panel}>
        <div className={styles.centerState}>Select a job to see details.</div>
      </section>
    );
  }

  if (store.isJobDetailLoading && !store.selectedJobDetail) {
    return (
      <section className={styles.panel}>
        <div className={styles.centerState}>Loading job details...</div>
      </section>
    );
  }

  if (store.jobDetailError && !store.selectedJobDetail) {
    return (
      <section className={styles.panel}>
        <div className={styles.centerState}>{store.jobDetailError}</div>
      </section>
    );
  }

  if (!store.selectedJobDetail) {
    return (
      <section className={styles.panel}>
        <div className={styles.centerState}>Job details are unavailable.</div>
      </section>
    );
  }

  const job = store.selectedJobDetail;

  return (
    <section className={styles.panel} aria-label="Job details">
      <div className={styles.headerRow}>
        <a
          className={styles.applyButton}
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Apply for ${job.title} at ${job.companyName}`}
        >
          Apply
        </a>
      </div>

      <div className={styles.scrollArea}>
        <JobDetailContent job={job} />
      </div>
    </section>
  );
});
