import { SurahResponse } from "../Types/Api";
const API_URL = `https://api.alquran.cloud/v1/surah/`;
export const GetSurahDetails = async (id: number): Promise<SurahResponse> => {
  try {
    const res = await fetch(`${API_URL}/${id}/editions/quran-uthmani,en.asad`);
    const data: SurahResponse = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch surah.");
    }

    return data;
  } catch (err) {
    throw new Error("Failed to fetch Surahs");
  }
};
