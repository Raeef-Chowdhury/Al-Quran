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
    <section className="hero__section bg-background text-center min-h-[80vh] max-w-[1600px]  items-center flex flex-col gap-[1.8rem]">
      <h1 className="text-[9.6rem] text-primary font-bold tracking-[0.5rem] ">
        The Holy Quran
      </h1>
      <p className="hero__extra--info text-text text-[2rem] max-w-[640px]">
        Reflect on the divine widsom of the Quran and find the detailed verses,
        recitaitons and duas in english and arabic
      </p>
      <p className="ayah__title bg-shade text-[#0b5217] rounded-full text-[2.4rem]">
        YOUR DAILY AYAH
      </p>
      <div className="daily__ayah  flex flex-col gap-[3.2rem] items-center max-w-[1200px] rounded-2xl  justify-center border-secondary border-2 ">
        <p className="hero__text text-text text-[2.4rem] ">
          {randomAyah.arabic}
        </p>
        <p className="hero__text text-text text-[2.4rem] ">
          {randomAyah.english}
        </p>
        <div className="ayah__origin flex gap-[1.8rem]">
          <p className="hero__text text-text text-[2.4rem] ">
            Surah {randomAyah.surah} -
          </p>
          <p className="hero__text text-text text-[2.4rem] ">
            {randomAyah.ayah}
          </p>
        </div>
      </div>
    </section>
  );
}
export default Hero;
