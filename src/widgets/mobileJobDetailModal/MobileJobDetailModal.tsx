import { Modal, Button } from "antd";
import { observer } from "mobx-react-lite";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { JobDetailContent } from "@/entities/job/ui/JobDetailContent";
import styles from "./MobileJobDetailModal.module.less";

export const MobileJobDetailModal = observer(function MobileJobDetailModal() {
  const store = useJobBoardStore();
  const job = store.selectedJobDetail;

  return (
    <Modal
      open={store.isMobileDetailOpen}
      onCancel={store.closeMobileDetail}
      footer={null}
      closable={false}
      centered
      width="100%"
      className={styles.modal}
      rootClassName={styles.modalRoot}
      styles={{
        container: {
          padding: 0,
          overflow: "hidden",
          borderRadius: 24,
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div className={styles.modalShell}>
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
              <Button
                className={styles.backButton}
                size="large"
                onClick={store.closeMobileDetail}
                aria-label="Close job details"
              >
                Back
              </Button>

              <Button
                className={styles.applyButton}
                type="primary"
                size="large"
                href={job.applyUrl}
                target="_blank"
                aria-label={`Apply for ${job.title} at ${job.companyName}`}
              >
                Apply Now
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </Modal>
  );
});
