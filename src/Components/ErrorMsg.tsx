import { RotateCcw } from "lucide-react";

export default function ErrorMsg({ msg }: { msg: string }) {
  return (
    <>
      <p className="mt-[19.2rem] text- text-[3.6rem] tracking-widest">
        Oops!, sorry but the data is not avaiable as we have: {msg}
      </p>
      <div className="mt-[2.4rem] flex items-center gap-[1.2rem] bg-primary/10 rounded-2xl mx-auto w-fit hover:bg-primary/20 group-hover:cursor-pointer transition-all duration-300 hover:scale-110 group px-[2.4rem] py-[0.3rem] justify-center">
        <button
          onClick={() => window.location.reload()}
          className="text-[2.4rem] tracking-wide group text-amber"
        >
          Reload Page
        </button>{" "}
        <RotateCcw className="text-red-400 group group-hover:rotate-6 transition-all duration-300" />
      </div>
    </>
  );
}
