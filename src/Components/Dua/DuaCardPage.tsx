import { Link } from "react-router-dom";
import { Dua } from "../../Types/Dua";
export function DuaCardPage({ dua }: { dua: Dua }) {
  return (
    <>
      <Link to={`/duas/${dua.number}`}>
        <div className="max-w-[480px] max-sm:max-w-[244px] max-sm:h-[144px] dua__card--page max-lg:h-[180px] h-[240px] mx-auto group relative shadow-2xl p-[1rem] rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
          <div className="flex flex-col gap-[1.6rem] justify-center items-center ">
            <div className="mt-[1.6rem]  gap-[0.8rem] bg-primary text-background font-bold rounded-full px-[2.4rem] py-[0.6rem] flex items-center justify-center text-[1.8rem] shadow-md uppercase tracking-wide">
              <span>
                {dua.category === "Home"
                  ? "🏠"
                  : dua.category === "Sleep"
                    ? "😴"
                    : dua.category === "Bathroom"
                      ? "🚿"
                      : dua.category === "Eating"
                        ? "🍽️"
                        : dua.category === "Mosque"
                          ? "🕌"
                          : dua.category === "Travel"
                            ? "✈️"
                            : dua.category === "Clothing"
                              ? "👕"
                              : dua.category === "Weather"
                                ? "🌦️"
                                : dua.category === "General"
                                  ? "📿"
                                  : dua.category === "Protection"
                                    ? "🛡️"
                                    : dua.category === "Prayer"
                                      ? "🕌"
                                      : dua.category === "Health"
                                        ? "🏥"
                                        : dua.category === "Knowledge"
                                          ? "📚"
                                          : dua.category === "Family"
                                            ? "👨‍👩‍👧‍👦"
                                            : dua.category === "Death"
                                              ? "🕊️"
                                              : "📖"}
              </span>
              {dua.category}
            </div>
            <h2 className="text-[1.8rem] font-bold text-shade mt-[2rem] text-center ">
              {dua.title}
            </h2>
          </div>

          <p className="text-[1.6rem]  leading-[1.8] text-shade font-arabic mb-[3rem] text-center">
            {dua.arabic.length > 20 ? (
              <>
                {dua.arabic.slice(0, 50)}
                <span className="text-[3.2rem] text-center ml-[0.4rem]">
                  .....
                </span>
              </>
            ) : (
              dua.arabic
            )}
          </p>

          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors"></span>
        </div>
      </Link>
    </>
  );
}
