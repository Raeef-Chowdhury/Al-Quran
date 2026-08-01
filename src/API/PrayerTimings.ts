import { GeolocationDetails } from "../Types/Geolocation";
import { PrayerTimesResponse } from "../Types/Api";
const Geolocation_URL = `https://nominatim.openstreetmap.org/reverse?format=json`;
const PrayerTimings_URL = `https://api.aladhan.com/v1/timings`;
export const GetGeolocationDetails = async (
  latitude: number,
  longitude: number,
): Promise<GeolocationDetails> => {
  try {
    const res = await fetch(
      `${Geolocation_URL}&lat=${latitude}&lon=${longitude}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch surahs ${res.status} ${res.statusText}`);
    }
    const data: GeolocationDetails = await res.json();

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Surahs due to ${err}`);
  }
};
export const GetPrayerTimings = async (
  formattedDate: string,
  latitude: number,
  longitude: number,
): Promise<PrayerTimesResponse> => {
  try {
    const res = await fetch(
      `${PrayerTimings_URL}/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=4&adjustment=1`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch surahs ${res.status} ${res.statusText}`);
    }
    const data: PrayerTimesResponse = await res.json();

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Surahs due to ${err}`);
  }
};
