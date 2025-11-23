/* eslint-disable react/prop-types */
import Header from "./Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function SurahPage() {
  const [quranSearch, setQuranSearch] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [allSurahs, setAllSurahs] = useState([]);
  const [bgState, setBgState] = useState("all");

  useEffect(() => {
    const fetchSurahs = async () => {
      const res = await fetch(`https://api.alquran.cloud/v1/surah`);
      const data = await res.json();
      setSurahs(data.data);
      setAllSurahs(data.data);
    };

    fetchSurahs();
  }, []);
  const filterSearch = (search) => {
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
          .includes(search.toLowerCase())
    );

    setSurahs(filtered);
  };
  useEffect(() => {
    filterSearch(quranSearch);
  }, [quranSearch]);
  function setShort() {
    const filtered = allSurahs.filter((s) => s.numberOfAyahs < 20);

    setBgState("short");
    setSurahs(filtered);
  }
  function setMedium() {
    const filtered = allSurahs.filter(
      (s) => s.numberOfAyahs >= 20 && s.numberOfAyahs < 50
    );
    setBgState("medium");
    setSurahs(filtered);
  }
  function setLong() {
    const filtered = allSurahs.filter((s) => s.numberOfAyahs >= 50);

    setBgState("long");
    setSurahs(filtered);
  }
  function setAll() {
    const filtered = allSurahs.filter((s) => s.numberOfAyahs > 1);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
    setBgState("all");
    setSurahs(filtered);
  }

  return (
    <>
      <Header />
      <main className="max-w-[1720px] flex flex-col items-center mx-auto surah__reading  w-[fit-content] h-[fit-content]">
        <div className="flex flex-col items-center gap-[2.4rem]">
          <h1 className="text-shade text-[6.4rem] border-b-amber-500 border-b-8 mt-[4.8rem] ">
            All Surahs
          </h1>
          <p className="text-text text-[2.4rem]  ">
            Browse and read from all 114 Surahs of the Quran
          </p>
          <input
            className="text-slate-300 mb-[1.2rem]  text-[2rem] py-[0.8rem] mt-[2.4rem] w-full outline-none min-w-[80rem] w-full mx-auto   flex-1  px-[2rem] bg-slate border-3  border-shade  rounded-xl "
            id="searchbar"
            type="text"
            placeholder="Search by name,number or translation here..."
            value={quranSearch}
            onChange={(e) => setQuranSearch(e.target.value)}
          />
          <div className="flex items-center mb-[4.8rem] justify-between w-[80%] bg-text border-shade border-4 p-0 rounded-full overflow-hidden">
            <button
              onClick={() => setAll(surahs)}
              className={`flex-1 text-[2.4rem] ${
                bgState === "all" ? "bg-background" : ""
              } text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              All
            </button>
            <button
              onClick={() => setShort(surahs)}
              className={`flex-1 text-[2.4rem] ${
                bgState === "short" ? "bg-background" : ""
              } text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              Short
            </button>
            <button
              onClick={() => setMedium(surahs)}
              className={`flex-1 text-[2.4rem] ${
                bgState === "medium" ? "bg-background" : ""
              } text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              Medium
            </button>
            <button
              onClick={() => setLong(surahs)}
              className={`flex-1 text-[2.4rem] ${
                bgState === "long" ? "bg-background" : ""
              } text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              Long
            </button>{" "}
          </div>
          <p className=" text-[2rem] text-text">
            Showing {surahs.length} of 114 surahs
          </p>
        </div>
        <ul className="mt-[7.2rem] grid grid-cols-4 gap-[6rem]  max-w-[1600px] mx-auto w-full">
          {surahs.map((surah) => {
            return (
              <QuranCard
                key={surah.number}
                verseLen={surah.ayahs}
                englishName={surah.englishName}
                arabicName={surah.name}
                englishTranslation={surah.englishNameTranslation}
                revelation={surah.revelationType}
                numberAyahs={surah.numberOfAyahs}
                number={surah.number}
              />
            );
          })}
        </ul>
      </main>
      <button className="mt-[6rem] ">
        <Link
          className="text-[1.8rem] rounded-xl px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem]"
          to="/"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12"
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
function QuranCard({
  numberAyahs,
  englishName,
  arabicName,
  englishTranslation,
  revelation,
  number,
}) {
  return (
    <li className="max-h-[40rem] quran__page--card  relative bg-gradient-to-br hover:translate-y-[-2rem]  quran__card from-shade  to-primary border-2 border-slate-100 hover:border-teal-400 rounded-3xl p-6 transition-all duration-300 cursor-pointer hover:shadow-2xl  group overflow-hidden ">
      <Link to={`/surahs/${number}`}>
        <div className="flex justify-between items-center w-full mb-6">
          <div className="w-24 h-24  rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600  flex items-center justify-center shadow-lg transition-all duration-300 transform ">
            <span className="text-white text-[3.2rem] font-bold  ">
              {number}
            </span>{" "}
          </div>
          <h3
            className={`text-background ${
              englishName.length > 12 ? "text-[1.8rem]" : "text-[2.4rem]"
            } font-bold tracking-wide`}
          >
            {englishName}
          </h3>
        </div>

        <div className="space-y-3 mb-5 flex justify-between items-start ">
          <div className="flex justify-between items-center gap-4">
            <p
              className="text-background  text-[2.4rem] font-semibold"
              style={{ fontFamily: "serif" }}
            >
              {arabicName}
            </p>
          </div>
          <p className="text-text  text-[1.8rem] text-left font-medium ">
            {englishTranslation}
          </p>
        </div>

        <div className=" justify-between flex items-center gap-2 pt-4 border-t border-slate-200">
          <div
            className={`flex gap-[0.8rem] quran__badge ${
              numberAyahs > 100 ? "text-[1.2rem]" : "text-[1.4rem]"
            } items-center rounded-full text-sm font-semibold border bg-green-300 text-green-700 border-green-200`}
          >
            <svg
              className="w-8 h-8 text-green-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="">{numberAyahs} Verses</span>
          </div>
          <span className="quran__badge text-[1.6rem] rounded-full text-sm font-semibold border bg-amber-300 text-amber-700 border-amber-200">
            {revelation}
          </span>
        </div>
      </Link>
    </li>
  );
}
export default SurahPage;
