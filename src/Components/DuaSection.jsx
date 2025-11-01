import { useEffect, useState } from "react";
import duas from "../data/daily-duas.json";
import { Link } from "react-router-dom";
function DuaSection() {
  const [dua, setDua] = useState([]);
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 37);
    const dua = duas[randomNumber];
    console.log(dua, randomNumber);

    setDua(dua);
  }, []);

  return (
    <section className="mt-[18rem] max-w-[1920px]   flex flex-col gap-[1.8rem] ">
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
      <div className="max-w-[1200px] mx-auto group relative shadow-2xl p-[3rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
        <div className="flex justify-between items-center mb-[3.2rem]">
          <div className=" bg-primary text-shade font-bold rounded-full px-[2rem] py-[0.8rem] flex items-center justify-center text-[1.4rem] shadow-md uppercase tracking-wide">
            {dua.category}
          </div>

          <h2 className="text-[2.8rem] font-bold text-shade mb-[3rem] mt-[2rem] text-right pr-[2rem]">
            {dua.title}
          </h2>
        </div>

        <p className="text-[3rem] leading-[1.8] text-shade font-arabic mb-[3rem] text-right">
          {dua.arabic}
        </p>

        <p className="text-[2rem] text-text/80 leading-relaxed font-light italic mb-[3rem] text-right border-t border-primary/20 pt-[2rem]">
          {dua.latin}
        </p>

        <div className="mb-[3rem] text-right">
          <p className="text-[2.4rem] text-text leading-relaxed font-light">
            {dua.translation}
          </p>
        </div>

        {dua.benefits && (
          <div className="bg-primary/5 rounded-xl p-[2.4rem] mb-[2rem] border-b-4 border-primary">
            <h3 className="text-[1.6rem] font-semibold text-primary uppercase mb-[1rem] tracking-wide">
              Benefits
            </h3>
            <p className="text-[1.8rem] text-text/90 leading-relaxed">
              {dua.benefits}
            </p>
          </div>
        )}

        <div className="pt-[2rem] text-center border-t border-primary/20 mt-[2rem]">
          <p className="text-[1.8rem] text-text/70">
            <span className="font-semibold text-primary">Source:</span>{" "}
            {dua.source}
          </p>
        </div>

        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors"></span>
      </div>
      <Link to="/duas">
        <button
          onClick={() => setDua(duas[Math.floor(Math.random() * duas.length)])}
          className="px-[2.4rem] mt-[3.8rem] py-[1.2rem] bg-primary text-background mx-auto rounded-full hover:bg-primary/90 transition-all duration-300 text-[2.4rem] font-semibold shadow-md hover:shadow-xl transform hover:scale-105"
        >
          Show Every Dua
        </button>
      </Link>
    </section>
  );
}
export default DuaSection;
