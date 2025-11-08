import "./App.css";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SurahSection from "./Components/SurahSection";
import DuaSection from "./Components/DuaSection";
import PrayerTimes from "./Components/PrayerSection";
import { useState, useEffect } from "react";

//TODO:Recitation Page=
//TODO:Sticky Nav
//TODO: CTA HERo
//TODO: Bookmark surah & dua
//TODO: Recitation Dua & Surah
//TODO: Add Widgets Namaz Info

function App() {
  const [quranSearch, setQuranSearch] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [bgState, setBgState] = useState("Home");
  useEffect(() => {
    const fetchSurahs = async () => {
      const res = await fetch(`https://api.alquran.cloud/v1/surah`);
      const data = await res.json();
      setSurahs(data.data);
      console.log(data.data);
    };

    fetchSurahs();
  }, []);
  return (
    <>
      <Header bgState={bgState} setBgState={setBgState} />
      <Hero />
      <SurahSection
        search={quranSearch}
        setSearch={setQuranSearch}
        surahs={surahs}
      />
      <DuaSection />
      <PrayerTimes />
    </>
  );
}

export default App;
