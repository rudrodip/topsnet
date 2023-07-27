import {ZenodoQueryParams, ZenodoData, Hit} from "./types";

const BASE_URL = 'https://zenodo.org/api/records/';

async function fetchZenodoApi(queryParams: ZenodoQueryParams): Promise<ZenodoData> {
  const queryParamsString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined) // Remove undefined values
    .map(([key, value]) => `${key}=${String(value)}`) // Convert all values to strings
    .join('&');

  const url = `${BASE_URL}?${queryParamsString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchRecord(id: string): Promise<Hit>{
  const url = `${BASE_URL}${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

const zenodoApi = {
  getRecords: fetchZenodoApi,
  getRecord: fetchRecord
};

export default zenodoApi;
