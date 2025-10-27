import Header from "./Header";
function SurahPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1440px] flex flex-col items-center mx-auto surah__reading  w-[fit-content] h-[fit-content]">
        <h1 className="text-shade text-[6.4rem] underline mt-[4.8rem] ">
          ALL SURAHS
        </h1>
        <p className="text-text text-[2.4rem] mt-[1.2rem] ">
          Browse and read from all 114 Surahs of the Quran
        </p>
      </main>
    </>
  );
}
export default SurahPage;
