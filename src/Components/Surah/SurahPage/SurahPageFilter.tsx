import { useState } from "react";
import { SurahFiltering } from "../../../Types/Surah";
export default function SurahPageFilter({ allSurahs, setSurahs }: any) {
  const [bgState, setBgState] = useState<string>("all");
  function setLength({ filter, min, max }: SurahFiltering) {
    const filtered = allSurahs.filter(
      (s) => s.numberOfAyahs >= min && s.numberOfAyahs <= max,
    );
    setBgState(filter);
    setSurahs(filtered);
  }
  return (
    <div className="flex items-center mb-[4.8rem] max-sm:mb-[3rem] justify-between w-[80%] max-sm:w-[95%] bg-text border-shade border-4 max-sm:border-2 p-0 rounded-full overflow-hidden">
      <button
        onClick={() => setLength({ filter: "all", min: 2, max: 500 })}
        className={`flex-1 text-[2.4rem] max-sm:text-[1.6rem] ${
          bgState === "all" ? "bg-background" : ""
        } text-primary py-[0.8rem] max-sm:py-[0.6rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
      >
        All
      </button>
      <button
        onClick={() => setLength({ max: 19, filter: "short", min: 0 })}
        className={`flex-1 text-[2.4rem] max-sm:text-[1.6rem] ${
          bgState === "short" ? "bg-background" : ""
        } text-primary py-[0.8rem] max-sm:py-[0.6rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
      >
        Short
      </button>
      <button
        onClick={() => setLength({ filter: "medium", min: 20, max: 49 })}
        className={`flex-1 text-[2.4rem] max-sm:text-[1.6rem] ${
          bgState === "medium" ? "bg-background" : ""
        } text-primary py-[0.8rem] max-sm:py-[0.6rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
      >
        Medium
      </button>
      <button
        onClick={() => setLength({ filter: "long", min: 50, max: 500 })}
        className={`flex-1 text-[2.4rem] max-sm:text-[1.6rem] ${
          bgState === "long" ? "bg-background" : ""
        } text-primary py-[0.8rem] max-sm:py-[0.6rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
      >
        Long
      </button>
    </div>
  );
}
