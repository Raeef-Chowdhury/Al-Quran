import { useEffect, useState } from "react";
import Header from "./Header";
import { motion } from "motion/react";
function PrayerPage() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
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

      // Load today's prayers
      if (parsedHistory[todayKey]) {
        setPrayers(parsedHistory[todayKey]);
      }
    }
  }, [todayKey]);

  // Calculate streak whenever history changes
  useEffect(() => {
    calculateStreak();
  }, [history]);

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

  const getArabicCalendar = async () => {
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
      );
      const data = await res.json();
      setDates(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  };
  const getArabicHolidays = async () => {
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/islamicHolidaysByHijriYear/${year}`
      );
      const data = await res.json();
      const filteredEvents = data.data.filter(
        (d) =>
          d.hijri.date === `01-09-${year}` ||
          d.hijri.date === `01-10-${year}` ||
          d.hijri.date === `10-12-${year}` ||
          d.hijri.date === `01-01-${year}`
      );
      setUpcomingEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  };
  useEffect(() => {
    getArabicHolidays();
  });
  useEffect(() => {
    getArabicCalendar();
  }, [month]);
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
        className=" mt-[4.8rem] mx-auto p-6 space-y-6"
      >
        {/* Date Display */}
        <div className=" text-center max-w-5xl mx-auto">
          <p className="text-text  text-[3.2rem] font-semibold mb-2">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {currentHijriDate ? (
            <p className="text-primary text-[2.4rem] mt-[2.4rem] font-bold">
              {currentHijriDate.hijri.day} {currentHijriDate.hijri.month.en}{" "}
              {currentHijriDate.hijri.year}
            </p>
          ) : (
            <p className="text-text opacity-60 text-lg">
              Loading Islamic date...
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[8rem]">
          <div className="rounded-2xl   text-text text-center transition-all duration-300">
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <span className="text-[4rem] font-bold opacity-80 ">🔥</span>
              <p className="text-[4rem] font-semibold opacity-90">
                Current Streak
              </p>
              <p className="text-xl opacity-60 ml-[5px] mb-[1.2rem]">(days) </p>
            </div>
            <p className="text-[8rem] w-40 h-40 flex items-center justify-center p-[4rem] max-w-[fit-content] mx-auto  font-extrabold text-primary leading-none bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20  rounded-full">
              <span className="mb-[1rem]">{currentStreak}</span>
            </p>
          </div>

          <div className="rounded-2xl text-text text-center transition-all duration-300">
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <p className="text-[4rem] font-semibold opacity-90">
                Today{"'"}s Progress
              </p>
            </div>
            <p className="text-[8rem] w-40 h-40 flex items-center justify-center p-[4rem] max-w-[fit-content] mx-auto font-extrabold text-tertiary leading-none bg-gradient-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/20 rounded-full">
              <span className="mb-[1rem]">{completedCount}</span>
            </p>
            <p className="text-xl opacity-60 mt-3">/5 prayers</p>
            <div className="mt-4 bg-text/10 rounded-full h-3 overflow-hidden max-w-[200px] mx-auto">
              <div
                className="bg-gradient-to-r from-tertiary to-primary h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="rounded-lg  p-6">
          <h2 className="text-[2.4rem] font-bold text-text mb-[3.2rem] mt-[6rem]">
            Daily Prayers
          </h2>
          <div className="space-y-10 max-w-[1200px] mx-auto ">
            {prayerList.map((prayer) => (
              <label
                key={prayer.key}
                className={`flex ${
                  prayers[prayer.key] ? "bg-primary/20" : "bg-primary/40"
                } group  items-center justify-between p-4 rounded-lg hover:bg-shade cursor-pointer transition-colors border border-transparent hover:border-primary`}
              >
                <div className="flex items-center ">
                  <input
                    type="checkbox"
                    checked={prayers[prayer.key]}
                    onChange={() => togglePrayer(prayer.key)}
                    className="w-8 h-8 accent-primary rounded cursor-pointer"
                  />
                  <div className="ml-3">
                    <span
                      className={`text-[3rem] ml-[1.8rem] group-hover:text-secondary/50  font-semibold ${
                        prayers[prayer.key]
                          ? "line-through opacity-50 text-text"
                          : " "
                      } `}
                    >
                      {prayer.name}
                    </span>
                  </div>
                </div>
                {prayers[prayer.key] && (
                  <span className="text-primary text-4xl">✓</span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className=" rounded-lg shadow-md p-6">
          <h2 className="text-[4rem] font-bold text-text  mb-4 mt-[7.2rem]">
            Upcoming Islamic Dates
          </h2>
          <div className="flex  flex-col gap-[1.2rem]">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="mx-auto min-w-[440px] flex justify-center items-center text-center mx-auto max-w-7xl items-center p-4 bg-shade rounded-lg hover:bg-tertiary hover:bg-opacity-20 transition-colors"
              >
                <div>
                  <span className="font-semibold text-[3.6rem] text-text block">
                    {event.hijri.holidays[0]}
                  </span>
                  <span className="text-sm text-text opacity-70">
                    {event.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default PrayerPage;
