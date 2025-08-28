export interface ErrorTexts {
  title: string;
  message: string;
  buttonText: string;
}

export interface AnnualData {
  [key: string]: number;
}

export interface CountryData {
  iso_code: string;
  data: AnnualData[];
}

export interface EmissionsData {
  [countryName: string]: CountryData;
}

export interface CountryListItem {
  name: string;
  iso_code: string;
  [key: string]: number | string;
}
