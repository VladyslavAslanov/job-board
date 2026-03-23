import type {
  JobPostDetailDto,
  JobPostListItemDto,
  JobPostsListResponseDto,
} from "./job.dto";
import type { JobDetail, JobListItem, JobsListPage } from "./job.model";

function mapSalary(
  min: number | null,
  max: number | null,
  currency: string | null
) {
  return {
    min,
    max,
    currency,
  };
}

export function mapJobPostListItemDtoToModel(
  dto: JobPostListItemDto
): JobListItem {
  return {
    id: dto.id,
    title: dto.title,
    companyName: dto.organization,
    companyLogoUrl: dto.organization_logo,
    postedAt: dto.date_posted,
    locations: dto.locations_derived,
    workArrangement: dto.ai_work_arrangement,
    salary: mapSalary(
      dto.ai_salary_minvalue,
      dto.ai_salary_maxvalue,
      dto.ai_salary_currency
    ),
    applyUrl: dto.url,
  };
}

export function mapJobPostDetailDtoToModel(dto: JobPostDetailDto): JobDetail {
  return {
    ...mapJobPostListItemDtoToModel(dto),
    descriptionHtml: dto.description_html,
  };
}

export function mapJobPostsListResponseDtoToModel(
  dto: JobPostsListResponseDto
): JobsListPage {
  return {
    count: dto.count,
    nextPageUrl: dto.next,
    previousPageUrl: dto.previous,
    items: dto.results.map(mapJobPostListItemDtoToModel),
  };
}
