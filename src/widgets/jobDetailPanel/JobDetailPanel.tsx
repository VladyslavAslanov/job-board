import { observer } from "mobx-react-lite";
import { useJobBoardStore } from "@/features/jobSearch/model/jobBoardStore.context";
import { formatJobPostedDate } from "@/shared/lib/format/date";
import {
  formatJobLocations,
  getWorkArrangementLabel,
} from "@/shared/lib/format/jobs";
import { formatSalaryRange } from "@/shared/lib/format/salary";
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

  const locationText = formatJobLocations(job.locations);
  const arrangementText = getWorkArrangementLabel(job.workArrangement);
  const salaryText = formatSalaryRange(job.salary);
  const postedText = formatJobPostedDate(job.postedAt);

  return (
    <section className={styles.panel}>
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

        <a
          className={styles.applyButton}
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Apply
        </a>
      </div>

      <div className={styles.metaBlock}>
        {salaryText ? <p className={styles.salary}>{salaryText}</p> : null}

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

        <p className={styles.metaLine}>
          <span className={styles.metaIcon} aria-hidden="true">
            ○
          </span>
          <span>Posted {postedText}</span>
        </p>
      </div>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
      />
    </section>
  );
});
