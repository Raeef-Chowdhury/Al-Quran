/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */ const excludeArr = [
  "Bathroom",
  "Mosque",
  "Eating",
  "Sleep",
  "General",
  "Protection",
  "Home",
  "Travel",
  "Weather",
];
import Header from "./Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import duas from "../data/daily-duas.json";
function DuaPage() {
  const [dua, setDua] = useState([]);
  const [allDuas, setAllDuas] = useState([]);
  const [bg, setBg] = useState("All");
  useEffect(() => {
    const dua = duas;

    setDua(dua);
    setAllDuas(dua);
  }, []);
  const [duaSearch, setDuaSearch] = useState("");
  const filterSearch = (search) => {
    const filtered = duas.filter(
      (d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.translation.toLowerCase().includes(search.toLowerCase())
    );

    setDua(filtered);
  };
  useEffect(() => {
    filterSearch(duaSearch);
  }, [duaSearch]);
  function setCategory(category) {
    const filter = allDuas.filter((d) => d.category === category);
    setBg(category);
    setDua(filter);
  }
  function setOther() {
    const filter = allDuas.filter((d) => !excludeArr.includes(d.category));
    console.log(filter);
    setBg("Other");
    setDua(filter);
  }
  function setAll() {
    const filtered = allDuas.filter((s) => s.number > 0);
    setBg("All");
    setDua(filtered);
  }
  return (
    <>
      <Header />

      <main className="max-w-[1720px] flex flex-col items-center mx-auto surah__reading  w-[fit-content] h-[fit-content]">
        <div className="flex flex-col  items-center gap-[2.4rem]">
          <h1 className="text-shade text-[6.4rem] border-b-amber-500 border-b-8 mt-[4.8rem] ">
            All Duas
          </h1>
          <p className="text-text text-[2.4rem]  ">
            Reflect on the most important duas of the Quran
          </p>
          <input
            className="text-slate-300  text-[2rem] py-[0.8rem] mt-[3.6rem]  outline-none w-[80rem]  mx-auto     px-[2rem] bg-slate border-3  border-shade  rounded-xl "
            id="text"
            placeholder="Search by name or translation here..."
            value={duaSearch}
            onChange={(e) => setDuaSearch(e.target.value)}
          />
          <div className="flex mt-[3.6rem] mb-[7.2rem] items-center justify-center items-center flex-wrap gap-[1.8rem] w-[120rem] ">
            <button
              onClick={() => setAll()}
              className={` text-[2rem] ${
                bg === "All" ? "bg-gradient-to-br  from-shade  to-primary" : ""
              }  text-text py-[0.8rem] hover:bg-gradient-to-br  from-shade  to-primary hover:bg-primary text   min-w-[18rem]  rounded-full overflow-hidden bg-shade/10 transition-all duration-300 hover:cursor-pointer`}
            >
              All
            </button>
            {excludeArr.map((category) => (
              <CategoryButton
                key={category}
                bg={bg}
                setCategory={setCategory}
                category={category}
              />
            ))}
            <button
              onClick={() => setOther()}
              className={` text-[2rem] ${
                bg === "Other"
                  ? "bg-gradient-to-br  from-shade  to-primary"
                  : ""
              } text-text py-[0.8rem] hover:bg-gradient-to-br  from-shade  to-primary hover:bg-primary text   min-w-[18rem]  rounded-full overflow-hidden bg-shade/10 transition-all duration-300 hover:cursor-pointer`}
            >
              Other
            </button>{" "}
          </div>
          <p className=" text-[2rem] text-text">
            Showing {dua.length} of 68 Duas
          </p>
        </div>
        <ul className="mt-[7.2rem] grid grid-cols-4 gap-[6rem]  max-w-[1600px] mx-auto w-full">
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
        <div className="max-w-[480px] dua__card--page h-[240px] mx-auto group relative shadow-2xl p-[1rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
          <div className="flex flex-col gap-[1.6rem] justify-center items-center ">
            <div className="mt-[1.6rem]  gap-[0.8rem] bg-primary text-background font-bold rounded-full px-[2.4rem] py-[0.6rem] flex items-center justify-center text-[1.8rem] shadow-md uppercase tracking-wide">
              <span>
                {dua.category === "Home"
                  ? "🏠"
                  : dua.category === "Sleep"
                  ? "😴"
                  : dua.category === "Morning"
                  ? "🌅"
                  : dua.category === "Bathroom"
                  ? "🚿"
                  : dua.category === "Eating"
                  ? "🍽️"
                  : dua.category === "Mosque"
                  ? "🕌"
                  : dua.category === "Ablution"
                  ? "💧"
                  : dua.category === "Fasting"
                  ? "🌙"
                  : dua.category === "Travel"
                  ? "✈️"
                  : dua.category === "Clothing"
                  ? "👕"
                  : dua.category === "Weather"
                  ? "🌦️"
                  : dua.category === "General"
                  ? "📿"
                  : dua.category === "Difficulty"
                  ? "🤲"
                  : dua.category === "Financial"
                  ? "💰"
                  : dua.category === "Social Etiquette"
                  ? "🤝"
                  : dua.category === "Protection"
                  ? "🛡️"
                  : dua.category === "Prayer"
                  ? "🕌"
                  : dua.category === "Health"
                  ? "🏥"
                  : dua.category === "Knowledge"
                  ? "📚"
                  : dua.category === "Family"
                  ? "👨‍👩‍👧‍👦"
                  : dua.category === "Death"
                  ? "🕊️"
                  : "📖"}
              </span>
              {dua.category}
            </div>
            <h2 className="text-[1.8rem] font-bold text-shade mt-[2rem] text-center ">
              {dua.title}
            </h2>
          </div>

          <p className="text-[1.6rem]  leading-[1.8] text-shade font-arabic mb-[3rem] text-center">
            {dua.arabic.length > 20 ? (
              <>
                {dua.arabic.slice(0, 50)}
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
function CategoryButton({ bg, setCategory, category }) {
  return (
    <>
      <button
        onClick={() => setCategory(category)}
        className={` text-[2rem] ${
          bg === category ? "bg-gradient-to-br  from-shade  to-primary" : ""
        } text-text py-[0.8rem] hover:bg-gradient-to-br  from-shade  to-primary hover:bg-primary text   min-w-[18rem]  rounded-full overflow-hidden bg-shade/10 transition-all duration-300 hover:cursor-pointer`}
      >
        {category}
      </button>
    </>
  );
}
export default DuaPage;
