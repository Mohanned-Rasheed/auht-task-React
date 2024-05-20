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
              window.localStorage.setItem("lang", "ar");
            }}
          >
            عربي
          </button>
        ) : (
          <button
            onClick={() => {
              i18n.changeLanguage("en");
              window.localStorage.setItem("lang", "en");
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
