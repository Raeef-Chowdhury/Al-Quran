import { useEffect, useState } from "react";
import Header from "./Header";
function PrayerPage() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const [dates, setDates] = useState([]);
  const [prayers, setPrayers] = useState({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });

  const prayerList = [
    { name: "Fajr", key: "fajr", time: "Dawn" },
    { name: "Dhuhr", key: "dhuhr", time: "Midday" },
    { name: "Asr", key: "asr", time: "Afternoon" },
    { name: "Maghrib", key: "maghrib", time: "Sunset" },
    { name: "Isha", key: "isha", time: "Night" },
  ];

  const upcomingDates = [
    { name: "Ramadan", date: "1st Ramadan 1446 (Feb 28, 2025)" },
    { name: "Eid al-Fitr", date: "1st Shawwal 1446 (Mar 30, 2025)" },
    { name: "Eid al-Adha", date: "10th Dhul Hijjah 1446 (Jun 6, 2025)" },
    { name: "Islamic New Year", date: "1st Muharram 1447 (Jul 6, 2025)" },
  ];

  const getArabicCalendar = async () => {
    try {
      const res = await fetch(
        `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
      );
      const data = await res.json();
      setDates(data.data);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  };

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
    <div className="">
      <Header />
      <div className=" mt-[4.8rem] mx-auto p-6 space-y-6">
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
              <span className="mb-[1rem]">0</span>
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

        {/* Prayer Checklist */}
        <div className="rounded-lg  p-6">
          <h2 className="text-[2.4rem] font-bold text-text mb-[3.2rem] mt-[6rem]">
            Daily Prayers
          </h2>
          <div className="space-y-10 max-w-[1200px] mx-auto ">
            {prayerList.map((prayer) => (
              <label
                key={prayer.key}
                className="flex bg-primary/20 group  items-center justify-between p-4 rounded-lg hover:bg-shade cursor-pointer transition-colors border border-transparent hover:border-primary"
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
                        prayers[prayer.key] ? "line-through opacity-50" : ""
                      } text-text`}
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
          {completedCount === 5 && (
            <div className="mt-4 p-3 mx-auto text-4xl max-w-[fit-content]  mt-[4.8rem] bg-primary bg-opacity-10 border border-primary rounded-lg text-center">
              <p className="text-shade font-semibold">
                🎉 All prayers completed today! Alhamdulillah!
              </p>
            </div>
          )}
        </div>

        <div className=" rounded-lg shadow-md p-6">
          <h2 className="text-[4rem] font-bold text-text  mb-4 mt-[7.2rem]">
            Upcoming Islamic Dates
          </h2>
          <div className="flex  flex-col gap-[1.2rem]">
            {upcomingDates.map((event, idx) => (
              <div
                key={idx}
                className="mx-auto min-w-[440px] flex justify-center items-center text-center mx-auto max-w-7xl items-center p-4 bg-shade rounded-lg hover:bg-tertiary hover:bg-opacity-20 transition-colors"
              >
                <div>
                  <span className="font-semibold text-[3.6rem] text-text block">
                    {event.name}
                  </span>
                  <span className="text-sm text-text opacity-70">
                    {event.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrayerPage;
