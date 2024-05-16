import React from "react";
import { auth } from "../firebase/config.ts";
import { useTranslation } from "react-i18next";
import GoogleImg from "../assets/Google__G__logo.svg.png";
import { Link } from "react-router-dom";
interface Props {}

function SginIn(props: Props) {
  const {} = props;
  //const [t, i18n] = useTranslation();
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <>
      {" "}
      <div className="min-h-screen bg-gray-200 dark:bg-gray-700">
        <div className="flex flex-col justify-center min-h-screen">
          <div className="flex flex-col max-w-[30rem] w-full h-[35rem] rounded-lg mx-auto items-center bg-white dark:bg-slate-900 dark:text-white">
            <div className="text-3xl font-bold mt-4">Login</div>
            <form className="mt-12 gap-6 flex flex-col justify-center items-center text-lg w-[65%]">
              <label className="flex flex-col w-80">
                Email
                <input className="bg-gray-100 rounded-md outline-blue-500"></input>
              </label>
              <label className="flex flex-col w-80">
                Password
                <input className="bg-gray-100 rounded-md outline-blue-500"></input>
              </label>
              <div className="flex flex-col justify-center items-center w-full">
                <Link
                  to={"/forgotpass"}
                  className="flex justify-end w-full text-sm cursor-pointer"
                >
                  Forgot Password?
                </Link>
                <input
                  className="cursor-pointer mt-4 w-80 bg-blue-500 rounded-md py-1 text-white hover:bg-blue-600"
                  type="submit"
                  value={"Login"}
                ></input>
              </div>
            </form>
            <div className="mt-10">Or</div>
            <div className="border rounded-full px-2 py-1 flex gap-2 items-center mt-4 cursor-pointer hover:bg-gray-200 hover:transition hover:duration-300">
              <img src={GoogleImg} width={30}></img> Login with Google
            </div>
            <div className="flex gap-1 mt-10">
              Dont have and account? <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SginIn;

//{t("title")}
{
  /* <button className="h-12  " onClick={toggleTheme}>
  Dark Mode
</button> */
}
{
  /* {i18n.language == "en" ? (
  <button
    onClick={() => {
      i18n.changeLanguage("ar");
    }}
  >
    عربي
  </button>
) : (
  <button
    onClick={() => {
      i18n.changeLanguage("en");
    }}
  >
    English
  </button>
)} */
}
