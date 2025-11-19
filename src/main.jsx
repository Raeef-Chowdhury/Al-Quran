import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SurahPage from "./Components/SurahPage.jsx";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import SurahDetails from "./Components/SurahDetails.jsx";
import DuaPage from "./Components/DuaPage.jsx";
import PrayerPage from "./Components/PrayerPage.jsx";
import DuaDetails from "./Components/DuaDetails.jsx";
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
  </StrictMode>
);
