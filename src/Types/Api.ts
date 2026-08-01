import { Surah } from "./Surah";
import { PrayerEvent } from "./Prayer";
import { PrayerTimesData } from "./Geolocation";
export interface SurahResponse {
  data: Surah[];
  code: string;
  status: string;
}
export interface YearResponse {
  data: string;
  code: string;
  status: string;
}

export interface CalendarEventsResponse {
  code: string;
  status: string;
  data: PrayerEvent[];
}

export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: PrayerTimesData;
}
