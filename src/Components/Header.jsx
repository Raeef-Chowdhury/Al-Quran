/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
function Header({ bgState, setBgState }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const setHome = () => setBgState("Home");
  const setSurahs = () => setBgState("Surahs");
  const setDuas = () => setBgState("Duas");
  const setRecitations = () => setBgState("Recitations");
  return (
    <>
      <header className="bg-tertiary/10 header ">
        <ul className="flex items-center justify-around ">
          <div className="header__title">
            <li className="text-primary  transition-all transition-300ms hover:scale-110 hover:cursor-pointer text-[4.8rem] flex items-center gap-[1rem] font-bold bg-[linear-gradient(to_right,#138926_0%,#17a22b_50%,#138926_100%)] bg-clip-text text-transparent">
              Al-Quran
            </li>
          </div>
          <div className="header__access flex gap-24 items-center justify-between">
            <Link to="/home" className="flex items-center gap-[1rem]">
              <li
                onClick={setHome}
                className={`text-[2.4rem] ${
                  currentPath === "/home"
                    ? "bg-shade text-[#0b2026]"
                    : "text-tertiary"
                }  flex items-center gap-[1rem] transition-all transition-300ms hover:bg-shade hover:text-[#0b2026] header__nav cursor-pointer rounded-xl`}
              >
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
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </li>
            </Link>
            <Link to="/surahs" className="flex items-center gap-[1rem]">
              <li
                onClick={setSurahs}
                className={`text-[2.4rem] ${
                  currentPath === "/surahs"
                    ? "bg-shade text-[#0b2026]"
                    : "text-tertiary"
                } flex items-center gap-[1rem]  transition-all transition-300ms hover:bg-shade hover:text-[#0b2026] header__nav cursor-pointer rounded-xl`}
              >
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
                Surahs
              </li>
            </Link>
            <Link to="/duas" className="flex items-center gap-[1rem]">
              <li
                onClick={setDuas}
                className={`text-[2.4rem] ${
                  currentPath === "/duas"
                    ? "bg-shade text-[#0b2026]"
                    : "text-tertiary"
                }  flex items-center gap-[1rem] transition-all transition-300ms hover:bg-shade hover:text-[#0b2026] header__nav cursor-pointer rounded-xl`}
              >
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
                Duas
              </li>
            </Link>
            <li
              onClick={setRecitations}
              className={`text-[2.4rem] ${
                bgState === "Recitations"
                  ? "bg-shade text-[#0b2026]"
                  : "text-tertiary"
              } flex items-center gap-[1rem] transition-all transition-300ms hover:bg-shade hover:text-[#0b2026] header__nav cursor-pointer rounded-xl`}
            >
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
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
              Recitations
            </li>
          </div>

          <li className="text-[2.4rem] theme__icon hover:bg-shade hover:text-[#0b2026] transition-all trasnition-300ms cursor-pointer rounded-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#138926"
              className="size-[6rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </li>
        </ul>
      </header>
    </>
  );
}
export default Header;
