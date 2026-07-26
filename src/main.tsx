import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SurahPage from "./Components/Surah/SurahPage/SurahPage.jsx";
import NotFoundPage from "./Components/NotFoundPage.js";
import SurahDetails from "./Components/Surah/SurahDetails.js";
import DuaPage from "./Components/Dua/DuaPage.jsx";
import PrayerPage from "./Components/Prayer/PrayerPage.jsx";
import DuaDetails from "./Components/Dua/DuaDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/surahs",
    element: <SurahPage />,
  },
  {
    path: "/duas",
    element: <DuaPage />,
  },

  {
    path: "/surahs/:id",
    element: <SurahDetails />,
  },
  {
    path: "/duas/:id",
    element: <DuaDetails />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/prayers",
    element: <PrayerPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
