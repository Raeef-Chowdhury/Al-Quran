import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const SurahDetails = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-[3.6rem] tracking-widest mb-[1.8rem] text-text font-bold pt-[3.6rem] uppercase">
        Surah {surah.englishName}
      </h1>
      <p className="text-[7.2rem] mb-[7.2rem]  text-shade">{surah.name}</p>
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
      <div className="mt-[4.8rem]  flex items-center gap-[1.8rem] self-center">
        {surah.number > 1 ? (
          <Link
            to={`/surahs/${surah.number - 1}`}
            className="text-[3.6rem] tracking-widest mb-[1.8rem] text-text font-bold pt-[3.6rem] underline"
          >
            Previous Surah
          </Link>
        ) : (
          "   "
        )}
        {surah?.number ? <p>Surah {surah.number}</p> : ""}
        {surah.number < 114 ? (
          <Link
            to={`/surahs/${surah.number + 1}`}
            className="text-[3.6rem] tracking-widest mb-[1.8rem] text-text font-bold pt-[3.6rem] underline"
          >
            next Surah
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SurahDetails;
