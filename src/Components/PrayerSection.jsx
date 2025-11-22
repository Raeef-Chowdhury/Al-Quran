import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
const prayers = [
  { name: "Fajr", arabicName: "الفجر" },
  { name: "Dhuhr", arabicName: "الظهر" },
  { name: "Asr", arabicName: "العصر" },
  { name: "Maghrib", arabicName: "المغرب" },
  { name: "Isha", arabicName: "العشاء" },
];

function PrayerTimes() {
  const [curPrayer, setCurPrayer] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const [timings, setTimings] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county;
          const country = data.address.country;

          setLocation({ city, country });
        },

        function (error) {
          console.log(error);
        }
      );
    }
  }, []);
  function getTimeDifference(timeStr) {
    if (!timeStr) return "";

    const [hour, minute] = timeStr.split(":").map(Number);
    const now = new Date();
    const prayer = new Date();

    // Set prayer time today
    prayer.setHours(hour, minute, 0, 0);

    // If prayer time already passed, make it tomorrow
    if (prayer <= now) prayer.setDate(prayer.getDate() + 1);

    const diffMs = prayer - now;
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);

    return `${hours}h ${minutes}m`;
  }
  const date = new Date();

  const day = date.getDate();

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  useEffect(() => {
    const fetchTimings = async () => {
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${location.city}&country=${location.country}&method=4&adjustment=1`
      );
      const data = await res.json();
      setTimings(data.data.timings);
      console.log(data.data.timings);
    };
    fetchTimings();
  }, [location]);

  useEffect(() => {
    if (!timings) return;

    setCurrentTime(new Date());
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };
    const now = currentTime;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const prayerMinutes = prayers.map((p) => ({
      name: p.name,
      minutes: timeToMinutes(timings[p.name]),
      time: timings[p.name],
    }));

    let current = null;
    let next = null;

    for (let i = 0; i < prayerMinutes.length; i++) {
      const prayer = prayerMinutes[i];
      const nextIndex = (i + 1) % prayerMinutes.length;
      const nextPrayerTime = prayerMinutes[nextIndex];

      if (currentMinutes >= prayer.minutes) {
        if (i === prayerMinutes.length - 1) {
          current = prayer.name;
          next = prayerMinutes[0].name;
          break;
        } else if (currentMinutes < nextPrayerTime.minutes) {
          current = prayer.name;
          next = nextPrayerTime.name;
          break;
        }
      }
    }

    if (!current) {
      current = prayerMinutes[prayerMinutes.length - 1].name;
      next = prayerMinutes[0].name;
    }

    setCurPrayer(current);
    setNextPrayer(next);
  }, [timings]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: "10rem" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        id="surahs"
        className="mt-[24rem] max-w-[1920px]   flex flex-col gap-[1.8rem]"
      >
        <div className="heading__box flex flex-col ">
          <h2 className="text-[6.4rem] text-primary font-bold underline">
            PRAYERS
          </h2>
          <p className="mt-[6rem] text-text text-[3.6rem]  flex  items-center justify-center">
            <span className="text-shade  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-18 h-18 transition-transform duration-300 group-hover:translate-y-[-3px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-6-5.373-6-10a6 6 0 1 1 12 0c0 4.627-6 10-6 10z"
                />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            </span>
            {location.city}, {location.country}
          </p>
          <p className="text-[4.8rem] mt-[2.4rem] text-blue-100">
            {new Date().getHours() < 10
              ? `0${new Date().getHours()}`
              : new Date().getHours() % 12}
            :
            {new Date().getMinutes() < 10
              ? `0${new Date().getMinutes()}`
              : new Date().getMinutes()}
            <span className="ml-4 text-[2.4rem]">
              {new Date().getHours() > 11 ? "PM" : "AM"}
            </span>
          </p>

          {timings && nextPrayer && timings[nextPrayer] ? (
            <p className="text-text text-[3.6rem] font-bold drop-shadow-lg">
              {nextPrayer} Namaz in{" "}
              <span className="text-amber-200">
                {" "}
                {getTimeDifference(timings[nextPrayer])}
              </span>
            </p>
          ) : (
            <p>Loading prayer times...</p>
          )}
        </div>
        <ul className="prayer_times flex items-center justify-center gap-[6rem] mt-[6rem]">
          {timings ? (
            prayers.map((prayer) => (
              <>
                <li
                  key={prayer.name}
                  className={`${
                    nextPrayer === prayer.name
                      ? "bg-gradient-to-br from-[#2bfc4e]/20 to-shade/50 scale-110 hover:scale-[1.15]  "
                      : "bg-shade/50"
                  } ${
                    curPrayer === prayer.name
                      ? "bg-gradient-to-br from-primary to-shade/10 scale-120 hover:scale-[1.25] mr-[1.6rem]"
                      : ""
                  } rounded-2xl flex flex-col items-center justify-center text-center shadow-lg p-[2rem] min-w-[25rem] min-h-[30rem] transform transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-2xl`}
                >
                  <div>
                    <h3
                      className={`${
                        curPrayer === prayer.name
                          ? "text-teal-100"
                          : "text-white"
                      } text-[3.6rem] font-bold mb-[1rem]`}
                    >
                      {prayer.name}
                    </h3>
                    <p className="text-[2.4rem] text-blue-100 mb-[2rem]">
                      {prayer.arabicName}
                    </p>
                    <div
                      className={`${
                        curPrayer === prayer.name
                          ? "text-teal-700"
                          : "text-white"
                      } text-[4.8rem] font-bold text-white bg-white/20 px-[2rem] py-[1rem] rounded-xl`}
                    >
                      {timings[prayer.name]}
                    </div>
                  </div>
                  <div className="mt-[1.8rem]">
                    {curPrayer === prayer.name && (
                      <div className="text-[1.2rem] font-bold uppercase tracking-wide mb-[1rem] bg-shade text-primary px-[1.5rem] py-[0.5rem] rounded-full">
                        Current Prayer
                      </div>
                    )}
                    {nextPrayer === prayer.name &&
                      curPrayer !== prayer.name && (
                        <div className="text-[1.2rem] font-bold uppercase tracking-wide mb-[1rem] bg-shade text-primary px-[1.5rem] py-[0.5rem] rounded-full">
                          Next Prayer
                        </div>
                      )}
                  </div>
                </li>
              </>
            ))
          ) : (
            <li>Loading prayer times...</li>
          )}
        </ul>

        <Link
          to="/prayers"
          className="text-[2.4rem] text-[tertiary] hover:cursor-pointer bg-shade/20 mx-auto py-[0.6rem] px-[1.8rem] rounded-xl hover:bg-tertiary transition-all mt-[4.8rem]            
        
        "
        >
          <button>More Prayer Info {">"}</button>
        </Link>
      </motion.section>
    </>
  );
}

export default PrayerTimes;
