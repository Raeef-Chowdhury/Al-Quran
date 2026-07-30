import { Surah } from "../Types/Surah";
const API_URL = `https://api.alquran.cloud/v1/surah/`;
export const GetSurahDetails = async (id: number): Promise<Surah> => {
  const res = await fetch(`${API_URL}/${id}/editions/quran-uthmani,en.asad`);
  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }
  const data = await res.json();

  return data;
};
