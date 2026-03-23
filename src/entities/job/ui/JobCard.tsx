import type { JobListItem } from "@/entities/job/model/job.model";
import { formatJobPostedDate } from "@/shared/lib/format/date";
import {
  getWorkArrangementLabel,
  formatJobLocations,
} from "@/shared/lib/format/jobs";
import { formatSalaryRange } from "@/shared/lib/format/salary";
import styles from "./JobCard.module.less";

interface JobCardProps {
  job: JobListItem;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
  const locationText = formatJobLocations(job.locations);
  const arrangementText = getWorkArrangementLabel(job.workArrangement);
  const salaryText = formatSalaryRange(job.salary);
  const postedDateText = formatJobPostedDate(job.postedAt);

  return (
    <button
      type="button"
      className={styles.card}
      data-selected={isSelected}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      <div className={styles.topRow}>
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

        <div className={styles.mainInfo}>
          <h3 className={styles.title}>{job.title}</h3>
          <p className={styles.company}>{job.companyName}</p>
        </div>
      </div>

      <div className={styles.meta}>
        {locationText ? (
          <span className={styles.pill}>{locationText}</span>
        ) : null}
        {arrangementText ? (
          <span className={styles.pill}>{arrangementText}</span>
        ) : null}
        {salaryText ? <span className={styles.pill}>{salaryText}</span> : null}
      </div>

      <p className={styles.posted}>Posted {postedDateText}</p>
    </button>
  );
}
