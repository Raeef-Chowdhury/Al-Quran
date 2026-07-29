import { Link } from "react-router-dom";
import { Surah } from "../../Types/Surah";
export default function SurahNavigation({ surah }: { surah: Surah }) {
  return (
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
  );
}
