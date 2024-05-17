import React from "react";
import { auth } from "../firebase/config.ts";
import { useTranslation } from "react-i18next";
import GoogleImg from "../assets/Google__G__logo.svg.png";
import { Link } from "react-router-dom";
import DarkLight from "../components/darkLight.tsx";
import ChangeLang from "../components/changeLang.tsx";
interface Props {}

function SginIn(props: Props) {
  const {} = props;
  const [t, i18n] = useTranslation();

  return (
    <>
      {" "}
      <div className="min-h-screen bg-gray-200 dark:bg-gray-700">
        <DarkLight />
        <ChangeLang />
        <div className="flex flex-col justify-center min-h-screen">
          <div className="flex flex-col max-w-[30rem] w-full h-fit rounded-lg mx-auto items-center bg-white dark:bg-slate-900 dark:text-white">
            <div className="text-3xl font-bold mt-4">
              {t("loginPage.login")}
            </div>
            <form className="mt-12 gap-6 flex flex-col justify-center items-center text-lg w-[65%]">
              <label className="flex flex-col w-80">
                {t("loginPage.email")}
                <input className="bg-gray-100 rounded-md outline-blue-500"></input>
              </label>
              <label className="flex flex-col w-80">
                {t("loginPage.password")}
                <input className="bg-gray-100 rounded-md outline-blue-500"></input>
              </label>
              <div className="flex flex-col justify-center items-center w-full">
                <Link
                  to={"/forgotpass"}
                  className="flex justify-end w-full text-sm cursor-pointer"
                >
                  {t("loginPage.forgot password")}
                </Link>
                <input
                  className="cursor-pointer mt-4 w-80 bg-blue-500 rounded-md py-1 text-white hover:bg-blue-600"
                  type="submit"
                  value={t("loginPage.login")}
                ></input>
              </div>
            </form>
            <div className="mt-10">{t("loginPage.or")}</div>
            <div className="border rounded-full px-2 py-1 flex gap-2 items-center mt-4 cursor-pointer hover:bg-gray-200 hover:transition hover:duration-300 dark:hover:opacity-80 dark:bg-gray-200 dark:text-black">
              <img src={GoogleImg} width={30}></img>
              {t("loginPage.login with google")}
            </div>
            <div className=" my-10">
              {t("loginPage.dont have and account register")}
              <Link to={"/register"}> {t("loginPage.register")}</Link>
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
