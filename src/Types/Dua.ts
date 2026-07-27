export interface Dua {
  number: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;

  benefits: string;
  source: string;
  category:
    | "Mosque"
    | "Bathroom"
    | "Eating"
    | "Sleep"
    | "General"
    | "Protection"
    | "Home"
    | "Travel"
    | "Weather"
    | "Clothing";
}
export interface DuaBtn {
  bg: string;
  category: string;
  setCategory: (category: string) => void;
}
