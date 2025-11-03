/* eslint-disable react/prop-types */
import Header from "./Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import duas from "../data/daily-duas.json";
function DuaPage() {
  const [dua, setDua] = useState([]);
  useEffect(() => {
    const dua = duas;

    setDua(dua);
  }, []);
  const [duaSearch, setDuaSearch] = useState("");
  return (
    <>
      <Header />

      <main className="max-w-[1720px] flex flex-col items-center mx-auto surah__reading  w-[fit-content] h-[fit-content]">
        <div className="flex flex-col items-center gap-[2.4rem]">
          <h1 className="text-shade text-[6.4rem] border-b-amber-500 border-b-8 mt-[4.8rem] ">
            All Duas
          </h1>
          <p className="text-text text-[2.4rem]  ">
            Reflect on the most important duas of the Quran
          </p>
          <input
            className="text-slate-300  text-[2rem] py-[0.8rem] mt-[3.6rem] w-full outline-none min-w-[80rem] w-full mx-auto   flex-1  px-[2rem] bg-slate-700 border-3  border-shade  rounded-xl "
            id="searchbar"
            type="text"
            placeholder="Search by name,number or translation here..."
            value={duaSearch}
            onChange={(e) => setDuaSearch(e.target.value)}
          />
          <div className="flex items-center justify-between w-[80%] bg-text border-shade border-4 p-0 rounded-full overflow-hidden">
            <button
              className={`flex-1 text-[2.4rem]  text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              All
            </button>
            <button
              className={`flex-1 text-[2.4rem] text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              Short
            </button>
            <button
              className={`flex-1 text-[2.4rem]  text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              Medium
            </button>
            <button
              className={`flex-1 text-[2.4rem] text-primary py-[0.8rem] hover:bg-background transition-all duration-300 hover:cursor-pointer`}
            >
              Long
            </button>{" "}
          </div>
          <p className=" text-[2rem] text-text">
            Showing (dualegth) of 34 Duas
          </p>
        </div>
        <ul className="mt-[7.2rem] grid grid-cols-2 gap-[6rem]  max-w-[1600px] mx-auto w-full">
          {dua.map((dua) => (
            <DuaCard key={dua.number} dua={dua} />
          ))}
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
function DuaCard({ dua }) {
  return (
    <>
      <Link to={`/duas/${dua.number}`}>
        <div className="max-w-[480px] min-h-[240px] mx-auto group relative shadow-2xl p-[1rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
          <div className="flex flex-col gap-[0.8rem] justify-center items-center ">
            <div className="w-20 h-20  rounded-2xl bg-gradient-to-br mt-[2.4rem] from-teal-500 to-teal-600  flex items-center justify-center shadow-lg transition-all duration-300 transform ">
              <span className="text-white text-[3.2rem] font-bold  ">
                {dua.number}
              </span>
            </div>
            <h2 className="text-[1.8rem] font-bold text-shade mt-[2rem] text-center ">
              {dua.title}
            </h2>
          </div>

          <p className="text-[1.6rem]  leading-[1.8] text-shade font-arabic mb-[3rem] text-center">
            {dua.arabic.length > 20 ? (
              <>
                {dua.arabic.slice(0, 100)}
                <span className="text-[3.2rem] text-center ml-[0.4rem]">
                  .....
                </span>
              </>
            ) : (
              dua.arabic
            )}
          </p>

          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors"></span>
        </div>
      </Link>
    </>
  );
}
export default DuaPage;
