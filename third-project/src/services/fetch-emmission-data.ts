import type { EmissionsData } from '../types/interfaces';

export default async function fetchEmissionsData(): Promise<EmissionsData> {
  const response = await fetch('/src/data/c02-emissions.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch data`);
  }

  const data: EmissionsData = await response.json();

  return data;
}
