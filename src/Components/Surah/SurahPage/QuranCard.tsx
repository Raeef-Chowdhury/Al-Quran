import { Link } from "react-router-dom";
export default function QuranCard({
  numberAyahs,
  englishName,
  arabicName,
  englishTranslation,
  revelation,
  number,
}) {
  return (
    <li className="max-h-[40rem] quran__page--card max-sm:max-w-[320px] max-sm:mx-auto  relative bg-gradient-to-br hover:translate-y-[-2rem]  quran__card from-shade  to-primary border-2 border-slate-100 hover:border-teal-400 rounded-3xl p-6 transition-all duration-300 cursor-pointer hover:shadow-2xl  group overflow-hidden ">
      <Link to={`/surahs/${number}`}>
        <div className="flex justify-between items-center w-full mb-6">
          <div className="w-24 h-24  rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600  flex items-center justify-center shadow-lg transition-all duration-300 transform ">
            <span className="text-white text-[3.2rem] font-bold  ">
              {number}
            </span>{" "}
          </div>
          <h3
            className={`text-background ${
              englishName.length > 12 ? "text-[1.8rem]" : "text-[2.4rem]"
            } font-bold tracking-wide`}
          >
            {englishName}
          </h3>
        </div>

        <div className="space-y-3 mb-5 flex justify-between items-start ">
          <div className="flex justify-between items-center gap-4">
            <p
              className="text-background  text-[2.4rem] font-semibold"
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
