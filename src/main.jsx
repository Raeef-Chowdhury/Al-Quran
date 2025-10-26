import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SurahSection from "./Components/SurahSection.jsx";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import SurahDetails from "./Components/SurahDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/surahs",
    element: <SurahSection />,
  },

  {
    path: "/surahs/:id",
    element: <SurahDetails />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
