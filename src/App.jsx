import "./App.css";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SurahSection from "./Components/SurahSection";
import DuaSection from "./Components/DuaSection";
import PrayerTimes from "./Components/PrayerSection";
import { useState, useEffect } from "react";

//TODO: Bookmark surah & dua
//TODO: Light Theme
//TODO: Responsiveness
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
