import type { JobPostCountriesResponseDto } from "./country.dto";
import type { CountryOption } from "./country.model";

export function mapCountriesResponseDtoToModel(
  dto: JobPostCountriesResponseDto
): CountryOption[] {
  return dto.countries.map((country) => ({
    value: country,
    label: country,
  }));
}
