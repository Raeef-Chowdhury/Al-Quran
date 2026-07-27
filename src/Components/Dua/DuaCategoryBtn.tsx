import { DuaBtn } from "../../Types/Dua";
export function CategoryButton({ bg, setCategory, category }: DuaBtn) {
  return (
    <>
      <button
        onClick={() => setCategory(category)}
        className={` text-[2rem] ${
          bg === category ? "bg-gradient-to-br  from-shade  to-primary" : ""
        } text-text py-[0.8rem] hover:bg-gradient-to-br  from-shade  to-primary hover:bg-primary text   min-w-[18rem]  rounded-full overflow-hidden bg-shade/10 transition-all duration-300 hover:cursor-pointer`}
      >
        {category}
      </button>
    </>
  );
}
