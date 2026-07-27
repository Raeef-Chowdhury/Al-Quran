import { useEffect, useState } from "react";
import { motion } from "motion/react";
import duasData from "../../Data/daily-duas.json";
import { DuaCardSection } from "./DuaCardSection";
import Button from "../Button";
import { Dua } from "../../Types/Dua";
const duas = duasData as Dua[];
function DuaSection() {
  const [dua, setDua] = useState<Dua | undefined>(undefined);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 37);
    const dua = duas[randomNumber];

    setDua(dua);
  }, []);
  if (!dua) {
    return <p>Loading...</p>;
  }
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
      <DuaCardSection
        category={dua.category}
        title={dua.title}
        arabic={dua.arabic}
        latin={dua.latin}
        translation={dua.translation}
        benefits={dua.benefits}
        source={dua.source}
        number={dua.number}
      />
      <Button text="Explore Important Duas" route="/duas" />
    </motion.section>
  );
}

export default DuaSection;
