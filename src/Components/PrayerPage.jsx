import { useEffect, useState } from "react";
import Header from "./Header";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
function PrayerPage() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const [hijriYear, setHijriYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const [dates, setDates] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const todayKey = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const [history, setHistory] = useState({});
  const [prayers, setPrayers] = useState({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });
  useEffect(() => {
    const savedHistory = localStorage.getItem("prayerHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setHistory(parsedHistory);
      if (parsedHistory[todayKey]) {
        setPrayers(parsedHistory[todayKey]);
      }
    }
  }, [todayKey]);

  // Calculate streak whenever history changes
  useEffect(() => {
    calculateStreak();
  }, [currentStreak, history]);

  const calculateStreak = () => {
    const sortedDates = Object.keys(history).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    if (sortedDates.length === 0) {
      setCurrentStreak(0);
      return;
    }

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = new Date(sortedDates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (checkDate.getTime() === expectedDate.getTime()) {
        const dayPrayers = history[sortedDates[i]];
        const completed = Object.values(dayPrayers).filter(Boolean).length;

        // Count as streak day if at least 5 prayers completed
        if (completed === 5) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    setCurrentStreak(streak);
  };
  const prayerList = [
    { name: "Fajr", key: "fajr", time: "Dawn" },
    { name: "Dhuhr", key: "dhuhr", time: "Midday" },
    { name: "Asr", key: "asr", time: "Afternoon" },
    { name: "Maghrib", key: "maghrib", time: "Sunset" },
    { name: "Isha", key: "isha", time: "Night" },
  ];

  const fetchIslamicData = async () => {
    try {
      setLoading(true);

      // Fetch current Islamic year and calendar in parallel
      const [yearRes, calendarRes] = await Promise.all([
        fetch(`https://api.aladhan.com/v1/currentIslamicYear`),
        fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`),
      ]);

      const [yearData, calendarData] = await Promise.all([
        yearRes.json(),
        calendarRes.json(),
      ]);

      const fetchedYear = yearData.data;
      setHijriYear(fetchedYear);
      setDates(calendarData.data);
      setLoading(false);

      // Now fetch holidays with the year we just got
      const holidaysRes = await fetch(
        `https://api.aladhan.com/v1/islamicHolidaysByHijriYear/${fetchedYear}`
      );
      const holidaysData = await holidaysRes.json();

      const targetDates = [
        `01-09-${fetchedYear}`,
        `01-10-${fetchedYear}`,
        `10-12-${fetchedYear}`,
        `01-01-${fetchedYear}`,
      ];

      const filteredEvents = targetDates
        .map((date) => holidaysData.data.find((d) => d.hijri.date === date))
        .filter((event) => event !== undefined);

      setUpcomingEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching Islamic data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIslamicData();
  }, [month]);
  const getDaysUntil = (eventDate) => {
    const [day, month, year] = eventDate.split("-");
    const eventDateTime = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = eventDateTime - today;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const togglePrayer = (key) => {
    setPrayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(prayers).filter(Boolean).length;
  const progress = (completedCount / 5) * 100;

  const currentHijriDate = dates.find(
    (d) => d.gregorian.date === formattedDate
  );

  return (
    <section>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-[4.8rem] mx-auto p-6 max-sm:p-4 space-y-6"
      >
        {/* Date Display */}
        <div className="text-center max-w-5xl mx-auto max-sm:max-w-full">
          <p className="text-text text-[3.2rem] max-sm:text-[2.4rem] font-semibold mb-2 max-sm:mb-1">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {currentHijriDate ? (
            <p className="text-primary text-[2.4rem] max-sm:text-[1.8rem] mt-[2.4rem] max-sm:mt-[1.6rem] font-bold">
              {currentHijriDate.hijri.day} {currentHijriDate.hijri.month.en}{" "}
              {currentHijriDate.hijri.year}
            </p>
          ) : (
            <p className="text-text opacity-60 text-lg max-sm:text-base">
              Loading Islamic date...
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 max-sm:gap-4 mt-[8rem] max-sm:mt-[4rem]">
          <div className="rounded-2xl text-text text-center transition-all duration-300">
            <div className="flex items-baseline justify-center gap-2 max-sm:gap-1 mb-3 max-sm:mb-2">
              <span className="text-[4rem] max-sm:text-[3rem] font-bold opacity-80">
                🔥
              </span>
              <p className="text-[4rem] max-sm:text-[2.8rem] font-semibold opacity-90">
                Current Streak
              </p>
            </div>
            <p className="text-[8rem] max-sm:text-[6rem] w-40 h-40 max-sm:w-32 max-sm:h-32 flex items-center justify-center p-[4rem] max-sm:p-[3rem] max-w-[fit-content] mx-auto font-extrabold text-primary leading-none bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-full">
              <span className="mb-[1rem] max-sm:mb-[0.5rem]">
                {currentStreak}
              </span>
            </p>
            <p className="mt-[0.8rem] text-xl max-sm:text-base opacity-60 ml-[5px] mb-[1.2rem]">
              (days){" "}
            </p>
          </div>

          <div className="rounded-2xl text-text text-center transition-all duration-300">
            <div className="flex items-baseline justify-center gap-2 max-sm:gap-1 mb-3 max-sm:mb-2">
              <p className="text-[4rem] max-sm:text-[2.8rem] font-semibold opacity-90">
                Today{"'"}s Progress
              </p>
            </div>
            <p className="text-[8rem] max-sm:text-[6rem] w-40 h-40 max-sm:w-32 max-sm:h-32 flex items-center justify-center p-[4rem] max-sm:p-[3rem] max-w-[fit-content] mx-auto font-extrabold text-tertiary leading-none bg-gradient-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/20 rounded-full">
              <span className="mb-[1rem] max-sm:mb-[0.5rem]">
                {completedCount}
              </span>
            </p>
            <p className="text-xl max-sm:text-base opacity-60 mt-3 max-sm:mt-2">
              /5 prayers
            </p>
            <div className="mt-4 max-sm:mt-3 bg-text/10 rounded-full h-3 max-sm:h-2 overflow-hidden max-w-[200px] max-sm:max-w-[150px] mx-auto">
              <div
                className="bg-gradient-to-r from-tertiary to-primary h-3 max-sm:h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6 max-sm:p-4">
          <h2 className="text-[2.4rem] max-sm:text-[2rem] font-bold text-text mb-[3.2rem] max-sm:mb-[2rem] mt-[6rem] max-sm:mt-[4rem]">
            Daily Prayers
          </h2>
          <div className="space-y-10 max-sm:space-y-6 max-w-[1200px] max-xl:max-w-[324px] mx-auto">
            {prayerList.map((prayer) => (
              <label
                key={prayer.key}
                className={`flex ${
                  prayers[prayer.key] ? "bg-primary/20" : "bg-primary/40"
                } group items-center justify-between p-4 max-sm:p-3 rounded-lg hover:bg-shade cursor-pointer transition-colors border border-transparent hover:border-primary`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={prayers[prayer.key]}
                    onChange={() => togglePrayer(prayer.key)}
                    className="w-8 h-8 max-sm:w-6 max-sm:h-6 accent-primary rounded cursor-pointer"
                  />
                  <div className="ml-3 max-sm:ml-2">
                    <span
                      className={`text-[3rem] max-sm:text-[2rem] ml-[1.8rem] max-sm:ml-[1rem] group-hover:text-secondary/50 font-semibold ${
                        prayers[prayer.key]
                          ? "line-through opacity-50 text-text"
                          : ""
                      }`}
                    >
                      {prayer.name}
                    </span>
                  </div>
                </div>
                {prayers[prayer.key] && (
                  <span className="text-primary text-4xl max-sm:text-3xl">
                    ✓
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-6 max-sm:p-4">
          <h2 className="text-[4rem] max-sm:text-[2.8rem] font-bold text-text mb-4 max-sm:mb-3 mt-[7.2rem] max-sm:mt-[4rem]">
            Upcoming Islamic Events
          </h2>
          <div className="grid grid-cols-2 max-xl:grid-cols-1 mt-[6rem] max-sm:mt-[4rem] gap-[6rem] max-sm:gap-[3rem]">
            {loading ? (
              <div className="text-[4.8rem] max-sm:text-[3rem] text-text">
                Loading events...
              </div>
            ) : (
              <>
                {upcomingEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`group ${
                      getDaysUntil(event.gregorian.date) < 0
                        ? "bg-primary/30 hover:cursor-pointer"
                        : "bg-gradient-to-br from-primary to-primary/50 hover:border-teal-500 hover:cursor-pointer hover:scale-110 max-sm:hover:scale-105"
                    } ${
                      [2, 0].includes(idx)
                        ? "max-xl:translate-x-[0rem] max-2xl:translate-x-[5rem] 2xl:translate-x-[12.5rem] transform translate-x-[22.5rem]"
                        : "max-xl:translate-x-[0rem] max-2xl:translate-x-[-5rem] 2xl:translate-x-[-12.5rem] transform translate-x-[-22.5rem]"
                    } mx-auto w-full max-w-[440px] max-sm:max-w-full items-center max-2xl:justify-center text-center p-6 max-sm:p-4 rounded-xl border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300`}
                  >
                    {console.log(idx)}
                    <div className="flex flex-col gap-[2.4rem] max-sm:gap-[1.6rem]">
                      <span className="font-bold text-[3.6rem] max-sm:text-[2.4rem] text-background text-center transition-colors duration-300 block">
                        {event.hijri.date === `01-01-${hijriYear}`
                          ? "Islamic New Year"
                          : event.hijri.date === `01-09-${hijriYear}`
                          ? "Ramadan"
                          : event.hijri.holidays[0]}
                      </span>
                      <div className="flex items-center justify-around max-sm:flex-col max-sm:gap-2">
                        <span className="text-[2rem] max-sm:text-[1.6rem] text-left max-sm:text-center text-text/70 group-hover:text-text/90 transition-colors duration-300 block">
                          {event.gregorian.month.en} {event.gregorian.day},{" "}
                          {event.gregorian.year}
                        </span>
                        <span className="text-[1.8rem] max-sm:text-[1.4rem] text-amber transition-colors duration-300 block">
                          {(() => {
                            const daysUntil = getDaysUntil(
                              event.gregorian.date
                            );

                            return daysUntil > 0
                              ? `In ${daysUntil} days`
                              : daysUntil === 0
                              ? "Today"
                              : "Passed";
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
      <button className="mt-[6rem] max-sm:mt-[4rem]">
        <Link
          className="text-[1.8rem] max-sm:text-[1.6rem] rounded-xl px-[2rem] max-sm:px-[1.6rem] py-[1rem] max-sm:py-[0.8rem] text-text text-bold bg-primary flex items-center gap-[1.2rem] max-sm:gap-[0.8rem]"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 max-sm:h-8 max-sm:w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.75z"
            />
          </svg>
          Back to Homepage
        </Link>
      </button>
    </section>
  );
}

export default PrayerPage;
