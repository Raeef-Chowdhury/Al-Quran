import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Button from "../Button";
import { Surah } from "../../Types/Surah";
import QuranCard from "./SurahPage/QuranCard";
interface SurahSectionProps {
  surahs: Surah[];
}
function SurahSection({ surahs }: SurahSectionProps) {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        id="surahs"
        className="mt-[24rem] mx-auto  max-w-[1920px] max-md:max-w-[384px] max-sm:max-w-[244px]  max-lg:max-w-[640px] max-2xl:max-w-[960px]   flex flex-col gap-[1.8rem]"
      >
        <div className="heading__box flex flex-col gap-[1rem]">
          <h2 className="text-[6.4rem] text-primary font-bold underline">
            SURAHS
          </h2>
          <p className="text-text text-[2.4rem] surahs__text">
            Discover all 114 Chapters of the Quran
          </p>{" "}
        </div>
        <ul className="quran__list grid max-md:grid-cols-1 max-2xl:grid-cols-2 grid-cols-4 gap-[6rem]  max-w-[1600px] mx-auto w-full">
          {surahs
            .filter((surah: Surah) => surah.number < 9)
            .map((surah: Surah) => {
              return (
                <QuranCard
                  key={surah.number}
                  englishName={surah.englishName}
                  name={surah.name}
                  englishNameTranslation={surah.englishNameTranslation}
                  revelationType={surah.revelationType}
                  numberOfAyahs={surah.numberOfAyahs}
                  number={surah.number}
                />
              );
            })}
        </ul>
        <Button text="View All Surahs" route="/surahs" />
      </motion.section>
    </>
  );
}
export default SurahSection;
