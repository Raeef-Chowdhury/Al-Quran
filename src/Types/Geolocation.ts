interface GeolocationAddress {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  borough?: string;
  city?: string;
  state?: string;
  "ISO3166-2-lvl4"?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  town?: string;
  village?: string;
  county?: string;
}

export interface GeolocationDetails {
  place_id: number;
  licence: string;
  osm_type: "node" | "way" | "relation";
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: GeolocationAddress;
  boundingbox: [string, string, string, string];
}

interface PrayerTimings {
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

interface Weekday {
  en: string;
  ar?: string;
}

interface HijriMonth {
  number: number;
  en: string;
  ar: string;
  days: number;
}

interface GregorianMonth {
  number: number;
  en: string;
}

interface Designation {
  abbreviated: string;
  expanded: string;
}

interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: HijriMonth;
  year: string;
  designation: Designation;
  holidays: string[];
  adjustedHolidays: string[];
  method: string;
}

interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: GregorianMonth;
  year: string;
  designation: Designation;
  lunarSighting: boolean;
}

interface DateInfo {
  readable: string;
  timestamp: string;
  hijri: HijriDate;
  gregorian: GregorianDate;
}

interface MethodParams {
  Fajr: number;
  Isha: number;
}

interface MethodLocation {
  latitude: number;
  longitude: number;
}

interface CalculationMethod {
  id: number;
  name: string;
  params: MethodParams;
  location: MethodLocation;
}

interface TimingOffset {
  Imsak: number;
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Sunset: number;
  Maghrib: number;
  Isha: number;
  Midnight: number;
}

interface PrayerTimesMeta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: CalculationMethod;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: TimingOffset;
}

export interface PrayerTimesData {
  timings: PrayerTimings;
  date: DateInfo;
  meta: PrayerTimesMeta;
}
