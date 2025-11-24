import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import duas from "../data/daily-duas.json";
function DuaDetails() {
  const { id } = useParams();

  const [dua, setDua] = useState([]);
  useEffect(() => {
    const foundDua = duas.find((dua) => dua.number === Number(id));
    setDua(foundDua || duas);
  }, [id]);
  const duaId = duas.map((dua) => dua.number === Number(`${id}`));
  console.log(dua, setDua, id, duaId);

  return (
    <>
      <div className="flex justify-center flex-col  items-center mb-[3.2rem] pt-[4.8rem]">
        <h2 className="text-[3.6rem] font-bold text-shade mb-[3rem] mt-[2rem] text-right pr-[2rem]">
          {dua.title}
        </h2>{" "}
        <div className="  gap-[0.8rem] bg-primary text-shade font-bold rounded-full px-[3.2rem] py-[0.8rem] flex items-center justify-center text-[1.8rem] shadow-md uppercase tracking-wide">
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
              : "📖"}

            {dua.category}
          </span>
        </div>
      </div>
      <div className="pt-[9.6rem] max-w-[1200px] max-xl:max-w-[644px] max-md:max-w-[444px] max-sm:max-w-[288px] mx-auto group relative shadow-2xl p-[3rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
        <p className="text-[3rem] leading-[1.8] text-shade font-arabic mb-[3rem] text-right">
          {dua.arabic}
        </p>

        <p className="text-[2rem] text-text/80 leading-relaxed font-light italic mb-[3rem] text-right border-t border-primary/20 pt-[2rem]">
          {dua.latin}
        </p>

        <div className="mb-[3rem] text-right">
          <p className="text-[2.4rem] text-text leading-relaxed font-light">
            {dua.translation}
          </p>
        </div>
      </div>{" "}
      {dua.benefits && (
        <div className="mt-[6rem] mx-auto max-w-[1200px] max-xl:max-w-[644px] max-md:max-w-[444px] max-sm:max-w-[288px] rounded-2xl bg-primary/5 rounded-xl p-[2.4rem] mb-[2rem] border-b-4 border-primary">
          <h3 className="text-[2.4rem] font-semibold text-primary uppercase mb-[1rem] tracking-wide">
            Benefits
          </h3>
          <p className="text-[2rem] text-text/90 leading-relaxed">
            {dua.benefits}
          </p>
        </div>
      )}
      <div className="pt-[2rem] text-center   mt-[2rem]">
        <p className="text-[1.8rem] text-text/70">
          <span className="font-semibold text-primary">Source:</span>{" "}
          {dua.source}
        </p>
      </div>
      <div className="max-w-[920px] mx-auto mt-[12rem] justify-around max-sm:grid max-sm:grid-cols-2 max-sm:justify-items-center max-sm:gap-[2rem] max-sm:w-[240px]   flex items-center max-xl:gap-[0rem]  gap-[3rem] self-center">
        {dua.number > 1 ? (
          <Link
            to={`/duas/${dua.number - 1}`}
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
            Previous dua
          </Link>
        ) : (
          "   "
        )}
        {dua?.number ? (
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
        {dua?.number ? (
          <Link
            className="text-[1.8rem] px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem]"
            to="/duas"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-[2.8rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            Back to duas
          </Link>
        ) : (
          ""
        )}
        {dua.number < 38 ? (
          <Link
            to={`/duas/${dua.number + 1}`}
            className="text-[1.8rem] px-[2rem] py-[1rem] text-text  text-bold bg-primary flex items-center gap-[1.2rem] "
          >
            Next dua{" "}
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
    </>
  );
}
export default DuaDetails;
