import { observer } from "mobx-react-lite";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { JobDetailContent } from "@/entities/job/ui/JobDetailContent";
import styles from "./MobileJobDetailModal.module.less";

export const MobileJobDetailModal = observer(function MobileJobDetailModal() {
  const store = useJobBoardStore();
  const job = store.selectedJobDetail;

  if (!store.isMobileDetailOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={store.closeMobileDetail}
      aria-hidden="true"
    >
      <div
        className={styles.modalShell}
        role="dialog"
        aria-modal="true"
        aria-label="Job details"
        onClick={(event) => event.stopPropagation()}
      >
        {!store.selectedJobId && !store.isJobDetailLoading ? (
          <div className={styles.centerState}>Select a job to see details.</div>
        ) : null}

        {store.isJobDetailLoading && !job ? (
          <div className={styles.centerState}>Loading job details...</div>
        ) : null}

        {store.jobDetailError && !job ? (
          <div className={styles.centerState}>{store.jobDetailError}</div>
        ) : null}

        {job ? (
          <>
            <div className={styles.content}>
              <JobDetailContent job={job} />
            </div>

            <div className={styles.bottomBar}>
              <button
                type="button"
                className={styles.backButton}
                onClick={store.closeMobileDetail}
                aria-label="Close job details"
              >
                Back
              </button>

              <a
                className={styles.applyButton}
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Apply for ${job.title} at ${job.companyName}`}
              >
                Apply Now
              </a>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
});
