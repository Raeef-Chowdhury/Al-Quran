/* eslint-disable react/prop-types */
function SurahSection({ search, setSearch }) {
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
          {console.log(search)}
        </div>
        <ul className="quran__list grid grid-cols-4 gap-6 max-w-[1440px] mx-auto w-full">
          <li className="relative bg-gradient-to-br hover:translate-y-[-2rem]  quran__card from-shade  to-primary border-2 border-slate-100 hover:border-teal-400 rounded-3xl p-6 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="w-24 h-24  rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600  flex items-center justify-center shadow-lg transition-all duration-300 transform ">
                <span className="text-white text-[3.2rem] font-bold  ">4</span>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-secondary text-[2.4rem] font-bold tracking-wide">
                  An-Nisa
                </h3>
                <p
                  className="text-secondary  text-[2.4rem] font-semibold"
                  style={{ fontFamily: "serif" }}
                >
                  النِّسَاء
                </p>
              </div>
              <p className="text-text  text-[1.8rem] text-left font-medium ">
                The Women
              </p>
            </div>

            <div className=" justify-between flex items-center gap-2 pt-4 border-t border-slate-200">
              <div className="flex gap-[0.8rem] quran__badge text-[1.6rem] items-center rounded-full text-sm font-semibold border bg-green-300 text-green-700 border-green-200">
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
                <span className="">176 Verses</span>
              </div>
              <span className="quran__badge text-[1.6rem] rounded-full text-sm font-semibold border bg-amber-300 text-amber-700 border-amber-200">
                Medinah
              </span>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}
export default SurahSection;
