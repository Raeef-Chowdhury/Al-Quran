import "./App.css";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SurahSection from "./Components/Surah/SurahSection";
import DuaSection from "./Components/Dua/DuaSection";
import PrayerTimes from "./Components/Prayer/PrayerSection";
import { useState, useEffect } from "react";
import { initGA } from "./utils/analytics";
import { GetQuranDetails } from "./API/Quran";
function App() {
  const [quranSearch, setQuranSearch] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [bgState, setBgState] = useState("Home");
  useEffect(() => {
    const fetchSurahs = async () => {
      const data = await GetQuranDetails();
      setSurahs(data.data);
      console.log(data.data);
    };

    fetchSurahs();
  }, []);
  useEffect(() => {
    initGA();
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
