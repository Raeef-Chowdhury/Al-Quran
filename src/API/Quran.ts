import { Surah } from "../Types/Surah";
const API_URL = `https://api.alquran.cloud/v1/surah/`;
export const GetQuranDetails = async (): Promise<Surah> => {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }
  const data = await res.json();

  return data;
};
