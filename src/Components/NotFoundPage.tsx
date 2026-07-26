import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="w-full h-[90vh] pt-[9.6rem] bg-background ">
      <h1 className="text-[9.6rem]">Oops! Page Not Found </h1>
      <p className="mt-20 text-text text-[2.4rem]">
        Please click the button below to continue reading the Quran
      </p>
      <Link to="/">
        <button className="text-[2.4rem] rounded-xl px-[3.6rem] py-[1.2rem] bg-red-900  mt-[6rem]">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};
export default NotFoundPage;
