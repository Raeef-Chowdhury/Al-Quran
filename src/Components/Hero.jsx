/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import ayahQuotes from "../Data/quran.json";
import { useEffect, useState } from "react";

function Hero() {
  const [randomAyah, setRandomAyah] = useState(null);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 23) + 1;
    const ayah = ayahQuotes[`ranAyah${randomNumber}`][0];
    setRandomAyah(ayah);
  }, []);
  if (!randomAyah) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="hero"
      className="hero__section bg-background text-center max-w-[1600px] items-center flex flex-col gap-[1.8rem]"
    >
      <h1 className="text-[7rem] my-10 sm:mt-0 sm:text-[9.6rem] text-primary font-bold sm:tracking-[0.5rem] ">
        The Holy Quran
      </h1>
      <p className="hero__extra--info text-text text-[2rem] md:text-[3rem] w-full px-5 md:max-w-[640px]">
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

      <div className="daily__ayah  flex flex-col gap-[3.2rem] dark:bg-background bg-shade items-center max-sm:max-w-[244px] max-w-[1200px] rounded-2xl  justify-center border-tertiary border-2 ">
        <AyahText ayahText={randomAyah.arabic} />
        <AyahText ayahText={randomAyah.english} />
        <div className="ayah__origin flex gap-[0.8rem] items-center">
          <span className="text-[2.4rem] text-text">Surah</span>
          <AyahText ayahText={randomAyah.surah} />
          <span className="text-[1.8rem]">-</span>
          <AyahText ayahText={randomAyah.ayah} />
        </div>
      </div>
    </motion.section>
  );
}
function AyahText({ ayahText }) {
  return <p className="hero__text text-text text-[2.4rem] ">{ayahText}</p>;
}
export default Hero;
