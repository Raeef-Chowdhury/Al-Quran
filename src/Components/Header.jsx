/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
function Header({ currentPath2 }) {
  const [sticky, setSticky] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath2);
  function handleSticky() {
    if (window.scrollY > 520) {
      setSticky(true);
    } else if (window.scrollY < 480) {
      setSticky(false);
    }
  }
  useEffect(() => {
    handleSticky(); // Check on mount
    window.addEventListener("scroll", handleSticky);
  }, []);
  return (
    <>
      {!sticky && (
        <header className={`    header p-[2rem]`}>
          <HeaderContent currentPath={currentPath} />
        </header>
      )}
      <AnimatePresence>
        {sticky && (
          <motion.header
            className="bg-header fixed header p-[0.4rem] z-50 top-0 left-0 w-full"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <HeaderContent currentPath={currentPath} />
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
function HeaderContent({ currentPath }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      root.style.setProperty("--color-background", "#102107");
      root.style.setProperty("--color-primary", "#138926");
      root.style.setProperty("--color-secondary", "#246a80");
      root.style.setProperty("--color-tertiary", "#508899");
      root.style.setProperty("--color-shade", "#a1d0a8");
      root.style.setProperty("--color-text", "#e7f8de");

      root.style.setProperty("--color-header", "oklch(26.6% 0.065 152.934)");
      root.style.setProperty(
        "--color-light-blue",
        "oklch(90.1% 0.058 230.902)"
      );
      root.style.setProperty("--color-amber", "oklch(92.4% 0.12 95.746)");
      root.style.setProperty("--color-slate", "oklch(37.2% 0.044 257.287)");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--color-background", "#b0f7dd");
      root.style.setProperty("--color-primary", "#17a22b");
      // root.style.setProperty("--color-secondary", "#3498b8");
      root.style.setProperty("--color-tertiary", "#106b91");
      root.style.setProperty("--color-shade", "#4a8a51");
      root.style.setProperty("--color-text", "#102107");
      root.style.setProperty(
        "--color-light-blue",
        "oklch(62.3% 0.214 259.815)"
      );
      root.style.setProperty("--color-header", "oklch(85.5% 0.138 181.071)");
      root.style.setProperty("--color-amber", "oklch(55.5% 0.163 48.998)");
      root.style.setProperty("--color-slate", "#293b2e");
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <ul className="flex items-center justify-around ">
      <div className="header__title">
        <li className="text-primary  transition-all transition-300ms hover:scale-110 hover:cursor-pointer ">
          <div className="h-[9.6rem] scale-150 flex items-center">
            <img
              src="/src/assets/remove-photos-background-removed.png"
              className="h-full w-auto scale-125 bg-[linear-gradient(to_right,#138926_0%,#17a22b_50%,#138926_100%)] bg-clip-text text-transparent"
              alt="logo"
            />
          </div>
        </li>
      </div>
      <div className="header__access flex gap-24 items-center justify-between">
        <Link to="/home" className="flex items-center gap-[1rem]">
          <li
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
        <Link to="/prayers" className="flex items-center gap-[1rem]">
          <li
            className={`text-[2.4rem] ${
              currentPath === "/prayers"
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
                d="M8.8 2.86C8.92 2.36 9.37 2 9.89 2C10.5 2 11 2.5 11 3.11V10M11 10V15.22C11 15.72 10.81 16.2 10.47 16.57L7.68 19.62L4.28 16.22L5.5 15L8.3 2.86"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.5 10V13C8.5 13.28 8.72 13.5 9 13.5C9.28 13.5 9.5 13.28 9.5 13V10C9.5 9.45 9.95 9 10.5 9C10.69 9 10.85 9.07 11 9.16"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 19L6 22L7.17 20.73L3.72 17.28L2 19"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.2 2.86C15.08 2.36 14.63 2 14.11 2C13.5 2 13 2.5 13 3.11V10M13 10V15.22C13 15.72 13.19 16.2 13.53 16.57L16.32 19.62L19.72 16.22L18.5 15L15.7 2.86"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.5 10V13C15.5 13.28 15.28 13.5 15 13.5C14.72 13.5 14.5 13.28 14.5 13V10C14.5 9.45 14.05 9 13.5 9C13.31 9 13.15 9.07 13 9.16"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 19L18 22L16.83 20.73L20.28 17.28L22 19"
              />
            </svg>
            Prayers
          </li>
        </Link>
      </div>

      <li
        onClick={toggleTheme}
        className="text-[2.4rem] theme__icon hover:bg-shade hover:text-background transition-all transition-300ms cursor-pointer rounded-full p-2"
      >
        {isDark ? (
          // Sun icon for light mode (shown in dark mode)
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
        ) : (
          // Moon icon for dark mode (shown in light mode)
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
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </li>
    </ul>
  );
}
export default Header;
