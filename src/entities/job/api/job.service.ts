import { apiClient } from "@/shared/api/axios";
import type {
  JobPostDetailDto,
  JobPostsListResponseDto,
} from "../model/job.dto";
import {
  mapJobPostDetailDtoToModel,
  mapJobPostsListResponseDtoToModel,
} from "../model/job.mappers";
import type {
  JobDetail,
  JobSearchParams,
  JobsListPage,
} from "../model/job.model";
import { buildJobPostsSearchParams } from "./job.query";

export async function getJobPosts(
  params: JobSearchParams
): Promise<JobsListPage> {
  const searchParams = buildJobPostsSearchParams(params);

  const response = await apiClient.get<JobPostsListResponseDto>(
    `/job-posts/?${searchParams.toString()}`
  );

  return mapJobPostsListResponseDtoToModel(response.data);
}

export async function getJobPostsByUrl(
  nextPageUrl: string
): Promise<JobsListPage> {
  const response = await apiClient.get<JobPostsListResponseDto>(nextPageUrl);

  return mapJobPostsListResponseDtoToModel(response.data);
}

export async function getJobPostById(jobId: string): Promise<JobDetail> {
  const response = await apiClient.get<JobPostDetailDto>(
    `/job-posts/${jobId}/`
  );

  return mapJobPostDetailDtoToModel(response.data);
}
