import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const SurahDetails = () => {
  const endOfSurah = useRef(null);
  const startOfSurah = useRef(null);
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollToEnd = () => {
    endOfSurah.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToStart = () => {
    startOfSurah.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,en.asad`
        );
        const data = await res.json();
        console.log(data.data);

        const arabic = data.data[0];
        const english = data.data[1];
        setSurah(arabic);
        setTranslation(english);

        console.log("Fetched surah:", data.data);
      } catch (err) {
        console.error("Error fetching surah:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [id]);
  if (loading || !surah) {
    return <p className="text-text">Loading surah {id}...</p>;
  }

  console.log(surah, translation);
  return (
    <div className="max-w-[1440px] flex flex-col items-center mx-auto surah__reading bg-background w-[fit-content] h-[fit-content]">
      <div ref={startOfSurah}></div>
      <h1 className="text-[3.6rem] tracking-widest mb-[1.8rem] text-text font-bold pt-[3.6rem] uppercase">
        Surah {surah.englishName}
      </h1>
      <p className="text-[7.2rem] mb-[7.2rem]  text-shade">{surah.name}</p>
      <button
        onClick={scrollToStart}
        className="fixed top-10 right-10 bg-primary/80 hover:bg-primary text-background p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
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
            d="M18 15l-6-6-6 6"
          />
        </svg>
      </button>
      <button
        onClick={scrollToEnd}
        className="fixed bottom-10 right-10 bg-primary/80 hover:bg-primary text-background p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <ul className="flex flex-col gap-[8rem] text-right mx-auto ">
        {surah.ayahs.map((ayah, index) => (
          <li
            key={ayah.number}
            className="group flex flex-col shadow-2xl  text-right relative p-[3rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300"
          >
            <div className="absolute left-[1rem] top-[3rem] bg-primary text-background font-bold rounded-full h-[4rem] w-[4rem] flex items-center justify-center text-[1.6rem] shadow-md">
              {ayah.numberInSurah}
            </div>
            <p className="text-[3.6rem] ml-[2rem] leading-snug text-shade font-arabic mb-[2rem]">
              {ayah.text}
            </p>
            <p className="text-[2.4rem] mt-[4rem] text-text text-right  leading-relaxed font-light italic  max-w-[90%] ml-auto">
              {translation?.ayahs[index]?.text}
            </p>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors"></span>
          </li>
        ))}
      </ul>
      <div ref={endOfSurah}></div>
      <div className="mt-[4.8rem]  flex items-center gap-[3rem] self-center">
        {surah.number > 1 ? (
          <Link
            to={`/surahs/${surah.number - 1}`}
            className="text-[1.8rem] px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem] "
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Surah
          </Link>
        ) : (
          "   "
        )}
        {surah?.number ? (
          <Link
            className="text-[1.8rem] px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem]"
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
        ) : (
          ""
        )}
        {surah?.number ? (
          <Link
            className="text-[1.8rem] px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem]"
            to="/surahs"
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
                d="M12 6v12m-6-6h12M4 6h16v12H4V6z"
              />
            </svg>
            Back to Surahs
          </Link>
        ) : (
          ""
        )}
        {surah.number < 114 ? (
          <Link
            to={`/surahs/${surah.number + 1}`}
            className="text-[1.8rem] px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem] "
          >
            Next Surah{" "}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SurahDetails;
