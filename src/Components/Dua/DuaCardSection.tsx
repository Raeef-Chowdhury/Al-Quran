import { Link } from "react-router-dom";
import { Dua } from "../../Types/Dua";
export function DuaCardSection({
  title,
  arabic,
  latin,
  translation,
  number,
}: Dua) {
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
