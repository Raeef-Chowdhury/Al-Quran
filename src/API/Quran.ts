import { SurahResponse } from "../Types/Api";
const API_URL = `https://api.alquran.cloud/v1/surah`;
export const GetQuranDetails = async (): Promise<SurahResponse> => {
  try {
    const res = await fetch(`${API_URL}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch surahs ${res.status} ${res.statusText}`);
    }
    const data: SurahResponse = await res.json();

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Surahs due to ${err}`);
  }
};
