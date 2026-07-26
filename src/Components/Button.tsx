/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Button({ text, route }) {
  return (
    <Link to={`${route}`}>
      <button className="hover:cursor-pointer cta__surahs text-text font-semibold group  transition-all transition-300ms flex gap-[0.8rem] items-center bg-primary text-[1.8rem]  mx-auto rounded-full border-shade border-4">
        {" "}
        {text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 24"
          className="w-16 h-6 transition-transform duration-300 group-hover:translate-x-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="0" y1="12" x2="50" y2="12" />
          <polyline points="40,4 52,12 40,20" />
        </svg>
      </button>
    </Link>
  );
}
export default Button;
