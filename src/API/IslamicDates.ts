const curYearUrl = "https://api.aladhan.com/v1/currentIslamicYear";
const holidayDateUrl = `https://api.aladhan.com/v1/gToHCalendar`;
const holidaysThisYearUrl = `https://api.aladhan.com/v1/islamicHolidaysByHijriYear`;
import { YearResponse } from "../Types/Api";
import { CalendarEventsResponse } from "../Types/Api";

export const GetCurYear = async (): Promise<YearResponse> => {
  try {
    const res = await fetch(`${curYearUrl}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch surahs ${res.status} ${res.statusText}`);
    }
    const data: YearResponse = await res.json();

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Surahs due to ${err}`);
  }
};

export const GetHolidaysDate = async (
  month: number,
  year: number,
): Promise<CalendarEventsResponse> => {
  try {
    const res = await fetch(`${holidayDateUrl}/${month}/${year}`);
    const data: CalendarEventsResponse = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Surahs due to ${err}`);
  }
};
export const GetHolidaysThisYear = async (
  year: number,
): Promise<CalendarEventsResponse> => {
  try {
    const res = await fetch(`${holidaysThisYearUrl}/${year}`);
    const data: CalendarEventsResponse = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Surahs due to ${err}`);
  }
};
