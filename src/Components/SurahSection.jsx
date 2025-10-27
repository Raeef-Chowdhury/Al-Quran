import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function SurahSection({ search, setSearch, surahs }) {
  return (
    <>
      <section
        id="surahs"
        className="surah__section  min-h-[80vh] max-w-[1920px]   flex flex-col gap-[1.8rem]"
      >
        <div className="heading__box flex flex-col gap-[1rem]">
          <h2 className="text-[6.4rem] text-primary font-bold underline">
            SURAHS
          </h2>
          <p className="text-text text-[2.4rem] surahs__text">
            Discover all 114 Chapters of the Quran
          </p>
          <input
            className="text-secondary text-[1.8rem] w-full outline-none max-w-[50%] mx-auto  flex-none surah__input bg-text border-3  border-tertiary rounded-xl "
            id="searchbar"
            type="text"
            placeholder="Search by name here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="quran__list grid grid-cols-4 gap-[6rem]  max-w-[1600px] mx-auto w-full">
          {surahs
            .filter((surah) => surah.number < 8)
            .map((surah) => {
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
        <Link to={"/surahs"}>
          <button className="hover:cursor-pointer cta__surahs text-text font-semibold group  transition-all transition-300ms flex gap-[0.8rem] items-center bg-primary text-[1.8rem]  mx-auto rounded-full border-shade border-4">
            {" "}
            View All Surahs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 24"
              className="w-16 h-6 transition-transform duration-300 group-hover:translate-x-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="0" y1="12" x2="50" y2="12" />
              <polyline points="40,4 52,12 40,20" />
            </svg>
          </button>
        </Link>
      </section>
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
    <li className="max-h-[40rem] relative bg-gradient-to-br hover:translate-y-[-2rem]  quran__card from-shade  to-primary border-2 border-slate-100 hover:border-teal-400 rounded-3xl p-6 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
      <Link to={`/surahs/${number}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="w-24 h-24  rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600  flex items-center justify-center shadow-lg transition-all duration-300 transform ">
            <span className="text-white text-[3.2rem] font-bold  ">
              {number}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center gap-4">
            <h3
              className={`text-secondary ${
                englishName.length > 12 ? "text-[1.8rem]" : "text-[2.4rem]"
              } font-bold tracking-wide`}
            >
              {englishName}
            </h3>
            <p
              className="text-secondary  text-[2.4rem] font-semibold"
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
export default SurahSection;
