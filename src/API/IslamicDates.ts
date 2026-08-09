import { YearResponse, CalendarEventsResponse } from "../Types/Api";

const curYearUrl = "https://api.aladhan.com/v1/currentIslamicYear";

const holidayDateUrl = "https://api.aladhan.com/v1/gToHCalendar";

const holidaysThisYearUrl =
  "https://api.aladhan.com/v1/islamicHolidaysByHijriYear";

export const GetCurYear = async (): Promise<YearResponse> => {
  const res = await fetch(curYearUrl);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch current year: ${res.status} ${res.statusText}`,
    );
  }

  const data: YearResponse = await res.json();

  return data;
};

export const GetHolidaysDate = async (
  month: number,
  year: number,
): Promise<CalendarEventsResponse> => {
  const res = await fetch(`${holidayDateUrl}/${month}/${year}`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch calendar dates: ${res.status} ${res.statusText}`,
    );
  }

  const data: CalendarEventsResponse = await res.json();

  return data;
};

export const GetHolidaysThisYear = async (
  year: number,
): Promise<CalendarEventsResponse> => {
  const res = await fetch(`${holidaysThisYearUrl}/${year}`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch holidays: ${res.status} ${res.statusText}`,
    );
  }

  const data: CalendarEventsResponse = await res.json();

  return data;
};
