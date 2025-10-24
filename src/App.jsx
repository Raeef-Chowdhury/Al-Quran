import "./App.css";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SurahSection from "./Components/SurahSection";
import { useState } from "react";

//TODO: DAILY DUA
//TODO:SECTION OF DUAS https://github.com/fitrahive/dua-dhikr
//TODO:Recitation Page
//TODO: REFACTOR HERO/HEader
function App() {
  const [quranSearch, setQuranSearch] = useState("");
  return (
    <>
      <Header />
      <Hero />
      <SurahSection search={quranSearch} setSearch={setQuranSearch} />
    </>
  );
}

export default App;
