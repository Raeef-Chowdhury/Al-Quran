import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Button from "./Button";

const prayers = [
  { name: "Fajr", arabicName: "الفجر" },
  { name: "Dhuhr", arabicName: "الظهر" },
  { name: "Asr", arabicName: "العصر" },
  { name: "Maghrib", arabicName: "المغرب" },
  { name: "Isha", arabicName: "العشاء" },
];

const date = new Date();
const day = date.getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const formattedDate = `${day}-${month}-${year}`;

function PrayerTimes() {
  const [curPrayer, setCurPrayer] = useState("");
  const [hasLocation, setHasLocation] = useState(null);
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
        (position) => {
          console.log(position);
          setHasLocation(true);
        },
        (error) => {
          console.log("Geolocation error:", error.code, error.message);
          setHasLocation(false);
        }
      );
    } else {
      setHasLocation(false);
    }
  }, []);
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        if (!navigator.geolocation) {
          console.error("Geolocation not supported");
          return;
        }

        // Get geolocation coordinates
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 300000,
            enableHighAccuracy: false,
          });
        });

        if (!mounted) return;

        const { latitude, longitude } = position.coords;

        // Fetch both location name and prayer times
        const [locationRes, timingsRes] = await Promise.all([
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          ),
          fetch(
            `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=4&adjustment=1`
          ),
        ]);

        if (!mounted) return;

        const [locationData, timingsData] = await Promise.all([
          locationRes.json(),
          timingsRes.json(),
        ]);

        if (mounted) {
          const city =
            locationData.address?.city ||
            locationData.address?.town ||
            locationData.address?.village ||
            locationData.address?.county ||
            "Unknown";
          const country = locationData.address?.country || "Unknown";

          setLocation({ city, country });

          if (timingsData.code === 200 && timingsData.data) {
            setTimings(timingsData.data.timings);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  function getTimeDifference(timeStr) {
    if (!timeStr) return "";

    const [hour, minute] = timeStr.split(":").map(Number);
    const now = new Date();
    const prayer = new Date();

    prayer.setHours(hour, minute, 0, 0);

    if (prayer <= now) prayer.setDate(prayer.getDate() + 1);

    const diffMs = prayer - now;
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);

    return `${hours}h ${minutes}m`;
  }

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
    <motion.section
      initial={{ opacity: 0, y: "10rem" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-96 max-w-[1920px]   flex flex-col gap-[1.8rem]"
    >
      {hasLocation === false ? (
        <>
          <div className="heading__box flex flex-col items-center mx-auto max-lg:max-w-[288px]">
            <h2 className="text-[6.4rem] text-primary font-bold underline">
              PRAYERS
            </h2>
            <div className="mt-24 max-w-7xl text-center bg-amber/20 border-2 border-amber rounded-2xl p-12">
              <p className="text-12 text-amber font-bold mb-8">
                📍 Location Access Required
              </p>
              <p className="text-8 text-text mb-8">
                Enable location permissions to see accurate prayer times for
                your area.
              </p>
              <p className="text-[1.6rem] text-text/80">
                Click the location icon in your browser{"'"} address bar to
                allow access.
              </p>
            </div>
          </div>

          <div className="mt-16 mx-6 sm:mx-12 lg:mx-24 2xl:mx-48 mb-12">
            <h3 className="text-[4.8rem] text-primary font-bold text-center mb-12">
              The Five Daily Prayers
            </h3>
            <ul className="prayer_times grid grid-cols-2 sm:flex flex-wrap justify-center gap-8 px-2 sm:px-4">
              {prayers.map((prayer) => (
                <li
                  key={prayer.name}
                  className="bg-linear-to-br min-w-100  from-primary/30 to-shade/40 rounded-lg sm:rounded-xl 2xl:rounded-2xl flex  items-center justify-center text-center shadow-lg p-[0.8rem] max-sm:p-0 lg:p-6 2xl:p-8 min-h-56 transform transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-2xl shrink-0"
                >
                  <div className="flex flex-col items-center justify-center h-full px-6 py-12">
                    <h3 className="text-white text-[2.4rem] lg:text-[3rem] 2xl:text-[3.6rem] font-bold mb-[0.6rem] sm:mb-4 lg:mb-[1.2rem] 2xl:mb-4">
                      {prayer.name}
                    </h3>
                    <p className="text-[2.4rem] text-blue-100 mb-4 max-sm:hidden">
                      {prayer.arabicName}
                    </p>
                    <p className="text-[2rem] sm:text-[1.6rem] lg:text-[1.8rem] text-white/80 text-center px-4">
                      {prayer.description ||
                        "One of the five obligatory prayers"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Button text={"Learn About Your Prayers"} route={"/prayers"} />
        </>
      ) : hasLocation === null ? (
        <p className="text-center text-text text-[3.6rem] mt-24">
          Checking location...
        </p>
      ) : (
        <>
          <div className="heading__box flex flex-col ">
            <h2 className="text-[6.4rem] text-primary font-bold underline">
              PRAYERS
            </h2>
            <p className="mt-24 text-text text-[3.6rem]  flex  items-center justify-center">
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
            <p className="text-[4.8rem] mt-[2.4rem] text-light-blue">
              {new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : new Date().getHours() === 0
                ? 12
                : new Date().getHours() > 12
                ? new Date().getHours() - 12
                : new Date().getHours()}
              :
              {new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : new Date().getMinutes()}
              <span className="ml-4 text-[2.4rem]">
                {new Date().getHours() >= 12 ? "PM" : "AM"}
              </span>
            </p>
            {timings && nextPrayer && timings[nextPrayer] ? (
              <p className="text-text text-[3.6rem] font-bold drop-shadow-lg">
                {nextPrayer} Namaz in{" "}
                <span className="text-amber">
                  {" "}
                  {getTimeDifference(timings[nextPrayer])}
                </span>
              </p>
            ) : (
              <p>Loading prayer times...</p>
            )}
          </div>

          <ul className="prayer_times  flex items-center justify-center gap-[0.8rem] sm:gap-12  lg:gap-18 2xl:gap-24 mt-8 sm:mt-12 lg:mt-16 2xl:mt-24 px-2 sm:px-4">
            {timings ? (
              prayers.map((prayer) => (
                <li
                  key={prayer.name}
                  className={`${
                    nextPrayer === prayer.name
                      ? "bg-linear-to-br  from-primary/40 to-shade/50 w-full scale-105 hover:scale-110 2xl:hover:scale-[1.15]"
                      : "bg-shade/50"
                  } ${
                    curPrayer === prayer.name
                      ? "bg-linear-to-br from-primary w-full to-shade/10 scale-110 hover:scale-[1.15] 2xl:hover:scale-[1.25]"
                      : ""
                  } rounded-lg sm:rounded-xl 2xl:rounded-2xl flex flex-col items-center justify-center text-center shadow-lg p-[0.8rem] max-sm:p-0 lg:p-6 2xl:p-8 min-w-44 sm:min-w-56 lg:min-w-68 2xl:min-w-96 min-h-56 sm:min-h-72 lg:min-h-88 2xl:min-h-120 transform transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-2xl shrink-0`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <h3
                      className={`${
                        curPrayer === prayer.name
                          ? "text-teal-100"
                          : "text-white"
                      } text-[3rem] sm:text-8 lg:text-[2.4rem] 2xl:text-[3.6rem] font-bold mb-[0.6rem] sm:mb-4 lg:mb-[1.2rem] 2xl:mb-4`}
                    >
                      {prayer.name}
                    </h3>{" "}
                    <p className="text-[2.4rem] text-blue-100 mb-8 max-sm:hidden">
                      {prayer.arabicName}
                    </p>
                    <div
                      className={`${
                        curPrayer === prayer.name
                          ? "text-teal-700"
                          : "text-white"
                      } text-[1.8rem] sm:text-[2.6rem] lg:text-[3.2rem] 2xl:text-[4.8rem] font-bold text-white bg-white/20 px-[0.8rem] sm:px-[1.2rem] lg:px-[1.5rem] 2xl:px-8 py-[0.4rem] sm:py-[0.6rem] lg:py-[0.8rem] 2xl:py-4 rounded-lg sm:rounded-xl`}
                    >
                      {timings[prayer.name]}
                    </div>
                    {(curPrayer === prayer.name ||
                      nextPrayer === prayer.name) && (
                      <div className="mt-[0.6rem] sm:mt-4 lg:mt-[1.2rem] 2xl:mt-[1.8rem]">
                        <div className="text-[0.9rem] sm:text-[1rem] lg:text-[1.2rem] 2xl:text-[1.2rem] font-bold uppercase tracking-wide bg-shade text-background px-[0.6rem] sm:px-[0.8rem] lg:px-4 2xl:px-[1.5rem] py-[0.2rem] sm:py-[0.3rem] lg:py-[0.4rem] 2xl:py-2 rounded-full whitespace-nowrap">
                          {curPrayer === prayer.name ? "Current" : "Next"}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-[1.6rem] sm:text-8">
                Loading...
              </li>
            )}
          </ul>
          <Button text={"Learn About Your Prayers"} route={"/prayers"} />
        </>
      )}
    </motion.section>
  );
}

export default PrayerTimes;
