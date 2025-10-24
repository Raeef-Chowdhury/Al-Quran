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
          <li className="quran__card bg-shade border-2 w-full border-primary hover:bg-black hover:translate-y-[-2rem] rounded-2xl  flex flex-col items-center justify-center transition-all duration-300 cursor-pointer">
            <div className="quran__card--number text-text rounded-full bg-[#0b2026] text-[3rem] font-bold mb-2">
              4
            </div>
            <div className="quran__card--names flex justify-between w-full">
              <p className="quran__card--name text-secondary text-[2rem] font-semibold text-center">
                An-Nisa
              </p>
              <p className="quran__card--arabName  text-secondary text-[2rem] font-semibold text-center">
                الرَّحْمَٰنِ
              </p>
            </div>
            <p className="quran__card--arabName text-left w-full  text-tertiary text-[2rem] font-semibold ">
              The Opening
            </p>
            <div className="quran__badges w-full flex justify-around">
              <span className="quran__badge text-[1.8rem] text-primary rounded-2xl bg-green-300 font-semibold">
                225 Verse
              </span>
              <span className="quran__badge text-[1.8rem] font-semibold text-amber-600 rounded-2xl bg-amber-200">
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
