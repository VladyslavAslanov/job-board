import { useState } from "react";
import type { JobDetail } from "@/entities/job/model/job.model";
import { formatJobPostedDate } from "@/shared/lib/format/date";
import {
  formatJobLocations,
  getWorkArrangementLabel,
} from "@/shared/lib/format/jobs";
import { formatSalaryRange } from "@/shared/lib/format/salary";
import styles from "./JobDetailContent.module.less";

interface JobDetailContentProps {
  job: JobDetail;
  titleAs?: "h2" | "h3";
}

export function JobDetailContent({
  job,
  titleAs = "h2",
}: JobDetailContentProps) {
  const [hasLogoError, setHasLogoError] = useState(false);

  const locationText = formatJobLocations(job.locations);
  const arrangementText = getWorkArrangementLabel(job.workArrangement);
  const salaryText = formatSalaryRange(job.salary);
  const postedText = formatJobPostedDate(job.postedAt);
  const showLogo = !!job.companyLogoUrl && !hasLogoError;

  const TitleTag = titleAs;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.logoWrap} aria-hidden="true">
            {showLogo ? (
              <img
                className={styles.logo}
                src={job.companyLogoUrl as string}
                alt=""
                loading="lazy"
                onError={() => setHasLogoError(true)}
              />
            ) : (
              <div className={styles.logoPlaceholder}>
                {job.companyName.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div className={styles.titleGroup}>
            <TitleTag className={styles.title}>{job.title}</TitleTag>
            <p className={styles.company}>{job.companyName}</p>
          </div>
        </div>
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
    </>
  );
}
