export interface Prayers {
  name: PrayerName;
  arabicName: string;
  description: string;
}
export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
export interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}
export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}
export interface PrayerEvent {
  hijri: HjiriAndGeogianInfo;
  gregorian: HjiriAndGeogianInfo;
}
export interface HjiriAndGeogianInfo {
  date: string;
  day: string;
  weekday: PrayerWeekday;
  month: PrayerMonth;
  designation: PrayerDesignation;
  year: string;
  holidays: string[];
  method?: string;
}
interface PrayerWeekday {
  ar?: string;
  en: string;
}
interface PrayerMonth {
  number: number;
  en: string;
  ar?: string;
  days?: number;
}
interface PrayerDesignation {
  abbreviated: string;
  expanded: string;
}
