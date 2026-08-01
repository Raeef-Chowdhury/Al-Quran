import Header from "../../Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuranCard from "./QuranCard";
import { Surah } from "../../../Types/Surah";
import SurahPageFilter from "./SurahPageFilter";
import { GetQuranDetails } from "../../../API/Quran";

function SurahPage() {
  const [quranSearch, setQuranSearch] = useState<string>("");
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      const data = await GetQuranDetails();
      setSurahs(data.data);
      setAllSurahs(data.data);
    };

    fetchSurahs();
  }, []);
  const filterSearch = (search: string) => {
    const filtered = allSurahs.filter(
      (s) =>
        s.englishName
          .toLowerCase()
          .replace(/-/, " ")
          .includes(search.toLowerCase()) ||
        s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
        s.number
          .toString()
          .toLowerCase()
          .replace(/-/, " ")
          .includes(search.toLowerCase()),
    );

    setSurahs(filtered);
  };
  useEffect(() => {
    filterSearch(quranSearch);
  }, [quranSearch]);

  return (
    <>
      <Header />
      <main className="max-w-[1720px] 2xl:max-w-[1720px]  lg:max-w-[1200px] md:max-w-[720px] sm:max-w-[544px] max-sm:max-w-[95%] xl:max-w-[1344px] flex flex-col items-center mx-auto surah__reading w-[fit-content] max-sm:w-full h-[fit-content] px-4 max-sm:px-2">
        <div className="flex flex-col items-center gap-[2.4rem] max-sm:gap-[1.6rem]">
          <h1 className="text-shade text-[6.4rem] max-sm:text-[4rem] border-b-amber-500 border-b-8 max-sm:border-b-4 mt-[4.8rem] max-sm:mt-[3rem]">
            All Surahs
          </h1>
          <p className="text-text text-[2.4rem] max-sm:text-[1.8rem] text-center max-sm:px-2">
            Browse and read from all 114 Surahs of the Quran
          </p>
          <input
            className="text-slate-300 mb-[1.2rem] max-sm:mb-[0.8rem] w-full md:min-w-[60rem] min-w-[80rem] max-sm:min-w-0 text-[2rem] max-sm:text-[1.6rem] py-[0.8rem] max-sm:py-[0.6rem] mt-[2.4rem] max-sm:mt-[1.6rem] outline-none mx-auto px-[2rem] max-sm:px-[1.5rem] bg-slate border-3 border-shade rounded-xl"
            id="searchbar"
            type="text"
            placeholder="Search by name,number or translation here..."
            value={quranSearch}
            onChange={(e) => setQuranSearch(e.target.value)}
          />
          <SurahPageFilter allSurahs={allSurahs} setSurahs={setSurahs} />
          <p className="text-[2rem] max-sm:text-[1.6rem] text-text">
            Showing {surahs.length} of 114 surahs
          </p>
        </div>
        <ul className="mt-[7.2rem] max-sm:mt-[4rem] grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[6rem] max-sm:gap-[3rem] max-w-[1600px] mx-auto w-full">
          {surahs.map((surah) => {
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
      </main>
      <button className="mt-[6rem] max-sm:mt-[4rem]">
        <Link
          className="text-[1.8rem] max-sm:text-[1.6rem] rounded-xl px-[2rem] max-sm:px-[1.6rem] py-[1rem] max-sm:py-[0.8rem] text-text text-bold bg-primary flex items-center gap-[1.2rem] max-sm:gap-[0.8rem]"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 max-sm:h-8 max-sm:w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.75z"
            />
          </svg>
          Back to Homepage
        </Link>
      </button>
    </>
  );
}
export default SurahPage;
