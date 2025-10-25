/* eslint-disable react/prop-types */
import ayahQuotes from "../data/quran.json";
import { useEffect, useState } from "react";

function Hero() {
  const [randomAyah, setRandomAyah] = useState(null);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 23) + 1;
    const ayah = ayahQuotes[`ranAyah${randomNumber}`][0];
    console.log(ayah, randomNumber);

    setRandomAyah(ayah);
  }, []);
  if (!randomAyah) return null;
  return (
    <section
      id="hero"
      className="hero__section bg-background text-center min-h-[80vh] max-w-[1600px]  items-center flex flex-col gap-[1.8rem]"
    >
      <h1 className="text-[9.6rem] text-primary font-bold tracking-[0.5rem] ">
        The Holy Quran
      </h1>
      <p className="hero__extra--info text-text text-[2rem] max-w-[640px]">
        Reflect on the divine widsom of the Quran and find the detailed verses,
        recitaitons and duas in english and arabic
      </p>
      <p className="ayah__title hover:cursor-pointer bg-shade flex gap-[0.6rem] group  items-center text-[#0b5217] rounded-full text-[2.4rem]">
        YOUR DAILY AYAH{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="relative z-10 w-10 h-10 transition-all duration-300 group-hover:translate-y-2 group-hover:drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <line x1="12" y1="4" x2="12" y2="20" />
          <polyline points="5,13 12,20 19,13" />
        </svg>
      </p>

      <div className="daily__ayah  flex flex-col gap-[3.2rem] items-center max-w-[1200px] rounded-2xl  justify-center border-secondary border-2 ">
        <AyahText ayahText={randomAyah.arabic} />
        <AyahText ayahText={randomAyah.english} />
        <div className="ayah__origin flex gap-[0.8rem] items-center">
          <span className="text-[2.4rem] text-text">Surah</span>
          <AyahText ayahText={randomAyah.surah} />
          <span className="text-[1.8rem]">-</span>
          <AyahText ayahText={randomAyah.ayah} />
        </div>
      </div>
    </section>
  );
}
function AyahText({ ayahText }) {
  return <p className="hero__text text-text text-[2.4rem] ">{ayahText}</p>;
}
export default Hero;
