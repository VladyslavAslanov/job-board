import { Modal, Button } from "antd";
import { observer } from "mobx-react-lite";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { formatJobPostedDate } from "@/shared/lib/format/date";
import {
  formatJobLocations,
  getWorkArrangementLabel,
} from "@/shared/lib/format/jobs";
import { formatSalaryRange } from "@/shared/lib/format/salary";
import styles from "./MobileJobDetailModal.module.less";

export const MobileJobDetailModal = observer(function MobileJobDetailModal() {
  const store = useJobBoardStore();
  const job = store.selectedJobDetail;

  const salaryText = job ? formatSalaryRange(job.salary) : null;
  const arrangementText = job
    ? getWorkArrangementLabel(job.workArrangement)
    : null;
  const locationText = job ? formatJobLocations(job.locations) : null;
  const postedText = job ? formatJobPostedDate(job.postedAt) : null;

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
              <div className={styles.header}>
                <div className={styles.headerMain}>
                  <div className={styles.logoWrap} aria-hidden="true">
                    {job.companyLogoUrl ? (
                      <img
                        className={styles.logo}
                        src={job.companyLogoUrl}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.logoPlaceholder}>
                        {job.companyName.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className={styles.titleGroup}>
                    <h2 className={styles.title}>{job.title}</h2>
                    <p className={styles.company}>{job.companyName}</p>
                  </div>
                </div>
              </div>

              <div className={styles.metaBlock}>
                {salaryText ? (
                  <p className={styles.salary}>{salaryText}</p>
                ) : null}

                {arrangementText ? (
                  <p className={styles.metaLine}>
                    <span className={styles.metaIcon} aria-hidden="true">
                      ⌂
                    </span>
                    <span>{arrangementText}</span>
                  </p>
                ) : null}

                {locationText ? (
                  <p className={styles.metaLine}>
                    <span className={styles.metaIcon} aria-hidden="true">
                      ⌖
                    </span>
                    <span>{locationText}</span>
                  </p>
                ) : null}

                {postedText ? (
                  <p className={styles.metaLine}>
                    <span className={styles.metaIcon} aria-hidden="true">
                      ○
                    </span>
                    <span>Posted {postedText}</span>
                  </p>
                ) : null}
              </div>

              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
              />
            </div>

            <div className={styles.bottomBar}>
              <Button
                className={styles.backButton}
                size="large"
                onClick={store.closeMobileDetail}
              >
                Back
              </Button>

              <Button
                className={styles.applyButton}
                type="primary"
                size="large"
                href={job.applyUrl}
                target="_blank"
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
