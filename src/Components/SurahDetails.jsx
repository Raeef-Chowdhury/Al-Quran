import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SurahDetails = () => {
  const endOfSurah = useRef(null);
  const startOfSurah = useRef(null);
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [curAudio, setCurAudio] = useState("");
  const [translation, setTranslation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
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
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight + 1;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (loading || !surah) {
    return <p className="text-text">Loading surah {id}...</p>;
  }

  const playAyah = (ayahNumberInSurah) => {
    // If already playing, stop previous
    if (curAudio) {
      curAudio.pause();
    }

    const audio = new Audio(
      `https://the-quran-project.github.io/Quran-Audio/Data/1/${surah.number}_${ayahNumberInSurah}.mp3`
    );

    audio.play().catch((err) => console.error("Error playing audio:", err));

    setCurAudio(audio);
    setIsPlaying(ayahNumberInSurah);

    // When audio ends, reset
    audio.onended = () => {
      setIsPlaying(0);
      setCurAudio(null);
    };
  };

  const pauseAyah = () => {
    if (curAudio) {
      curAudio.pause();
      setIsPlaying(0);
      setCurAudio(null);
    }
  };
  return (
    <div className="max-w-[1440px] flex flex-col items-center mx-auto surah__reading bg-background w-[fit-content] h-[fit-content]">
      {" "}
      <div className="fixed top-0 left-0 w-full h-[8px] bg-background/5 z-[9999]">
        <div
          className="h-full bg-primary transition-all duration-200 ease-linear"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
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
            className={` ${
              isPlaying == ayah.numberInSurah
                ? "bg-primary/40 hover:bg-primary/50"
                : "bg-primary/10 hover:bg-primary/20"
            } group flex flex-col shadow-2xl  text-right relative p-[3rem] rounded-2xl  border border-primary/30  hover:border-primary/60 transition-all duration-300`}
          >
            <div className="absolute left-[1rem] top-[1rem] bg-primary text-background font-bold rounded-full h-[4rem] w-[4rem] flex items-center justify-center text-[1.6rem] shadow-md">
              {ayah.numberInSurah}
            </div>
            {isPlaying == ayah.numberInSurah ? (
              <button onClick={() => pauseAyah(ayah.numberInSurah)}>
                <div className="absolute left-[1rem] top-[7rem] bg-primary text-background font-bold rounded-full h-[4rem] w-[4rem] flex items-center justify-center text-[1.6rem] shadow-md">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    viewBox="0 0 32 32"
                  >
                    <path d="M13 28H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1zm-5-2h4V6H8v20zM25 28h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1zm-5-2h4V6h-4v20z" />
                  </svg>
                </div>
              </button>
            ) : (
              <button onClick={() => playAyah(ayah.numberInSurah)}>
                <div className="absolute left-[1rem] top-[7rem] bg-primary text-background font-bold rounded-full h-[4rem] w-[4rem] flex items-center justify-center text-[1.6rem] shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className=" h-12"
                  >
                    <g data-name="high audio">
                      <path d="M11.46 3c-1 0-1 .13-6.76 4H1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3.7l5.36 3.57A2.54 2.54 0 0 0 14 18.46V5.54A2.54 2.54 0 0 0 11.46 3zM2 9h2v6H2zm10 9.46a.55.55 0 0 1-.83.45L6 15.46V8.54l5.17-3.45a.55.55 0 0 1 .83.45zM16.83 9.17a1 1 0 0 0-1.42 1.42 2 2 0 0 1 0 2.82 1 1 0 0 0 .71 1.71c1.38 0 3.04-3.62.71-5.95z" />
                      <path d="M19 7.05a1 1 0 0 0-1.41 1.41 5 5 0 0 1 0 7.08 1 1 0 0 0 .7 1.7c1.61 0 4.8-6.05.71-10.19z" />
                      <path d="M21.07 4.93a1 1 0 0 0-1.41 1.41 8 8 0 0 1 0 11.32 1 1 0 0 0 1.41 1.41 10 10 0 0 0 0-14.14z" />
                    </g>
                  </svg>
                </div>
              </button>
            )}

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
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-[2.8rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
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
