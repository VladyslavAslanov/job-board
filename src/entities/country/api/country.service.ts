import { apiClient } from "@/shared/api/axios";
import type { JobPostCountriesResponseDto } from "../model/country.dto";
import { mapCountriesResponseDtoToModel } from "../model/country.mappers";
import type { CountryOption } from "../model/country.model";

export async function getCountries(): Promise<CountryOption[]> {
  const response = await apiClient.get<JobPostCountriesResponseDto>(
    "/job-post-countries/"
  );

  return mapCountriesResponseDtoToModel(response.data);
}
