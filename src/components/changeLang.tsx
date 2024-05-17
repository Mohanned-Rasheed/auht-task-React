import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

function ChangeLang(props: Props) {
  const {} = props;
  const [t, i18n] = useTranslation();
  return (
    <>
      <div className=" absolute bottom-5 left-5 h-12 p-3 bg-white dark:bg-black text-black dark:text-white rounded-lg shadow-md outline-black dark:outline-white outline hover:opacity-60 ">
        {i18n.language == "en" ? (
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
        )}
      </div>
    </>
  );
}

export default ChangeLang;
