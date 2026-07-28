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
}
export interface SurahFiltering {
  filter: string;
  min: number;
  max: number;
}
