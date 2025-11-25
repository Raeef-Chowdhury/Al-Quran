/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import duas from "../Data/daily-duas.json";
import { Link } from "react-router-dom";
import Button from "./Button";
function DuaSection() {
  const [dua, setDua] = useState([]);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 37);
    const dua = duas[randomNumber];
    console.log(dua, randomNumber);

    setDua(dua);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: "10rem" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-[30rem] max-w-[1920px]   flex flex-col gap-[1.8rem] "
    >
      <h1 className="text-[6.4rem] text-primary font-bold underline uppercase">
        Duas
      </h1>
      <p className="text-text text-[2.4rem] mb-[3.6rem]">
        A Collection of Supplications in Islam
      </p>{" "}
      <div className="text-center mb-[2rem]">
        <span className="bg-primary/20 text-primary font-bold px-[2rem] py-[0.8rem] rounded-full text-[1.8rem] uppercase tracking-wide shadow-md">
          Daily Dua
        </span>
      </div>
      <DuaCard
        category={dua.category}
        title={dua.title}
        arabic={dua.arabic}
        latin={dua.latin}
        translation={dua.translation}
        notes={dua.notes}
        benefits={dua.benefits}
        source={dua.source}
        number={dua.number}
      />
      <Button text="Explore Important Duas" route="/duas" />
    </motion.section>
  );
}
function DuaCard({ title, arabic, latin, translation, number }) {
  return (
    <Link to={`/duas/${number}`}>
      <div className="max-w-[1200px] max-md:max-w-[424px] max-2xl:max-w-[628px] max-sm:max-w-[244px] mx-auto group relative shadow-2xl p-[3rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
        <div className="flex justify-center items-center mb-[3.2rem]">
          <h2 className="text-[2.8rem] font-bold text-shade mb-[3rem] mt-[2rem] text-center ">
            {title}
          </h2>
        </div>

        <p className="text-[3rem] leading-[1.8] text-shade font-arabic mb-[3rem] text-center">
          {arabic}
        </p>

        <p className="text-[2rem] text-text/80 leading-relaxed font-light italic mb-[3rem] text-center border-t border-primary/20 pt-[2rem]">
          {latin}
        </p>

        <div className="mb-[3rem] text-center">
          <p className="text-[2.4rem] text-text leading-relaxed font-light">
            {translation}
          </p>
        </div>

        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors"></span>
      </div>
    </Link>
  );
}
export default DuaSection;
