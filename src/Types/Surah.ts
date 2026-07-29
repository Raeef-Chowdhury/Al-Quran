export interface Ayah {
  surah: string;
  ayah: string;
  arabic: string;
  english: string;
}
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs?: AyahDetails[];
}
interface AyahDetails {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}
export interface SurahFiltering {
  filter: string;
  min: number;
  max: number;
}
