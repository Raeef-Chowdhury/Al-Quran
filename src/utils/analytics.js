import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const IS_DEBUG = import.meta.env.VITE_GA4_DEBUG === "true";

export const initGA = () => {
  if (!MEASUREMENT_ID) {
    return;
  }

  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      debug_mode: IS_DEBUG,
    },
  });
};
