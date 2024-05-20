import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {}

function DarkLight(props: Props) {
  const {} = props;
  const [t] = useTranslation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "Light"
  );
  useEffect(() => {
    if (localStorage.getItem("mode") == "Dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "Dark");
      setDarkMode("Dark");
    }
  }, [darkMode]);
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");

    if (localStorage.getItem("mode") == "Dark") {
      localStorage.setItem("mode", "Light");
    } else {
      localStorage.setItem("mode", "Dark");
    }
    setDarkMode(localStorage.getItem("mode"));
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="p-3 bg-white dark:bg-black text-black dark:text-white absolute rounded-lg shadow-md outline-black dark:outline-white outline bottom-5 right-5 hover:opacity-60"
      >
        {darkMode == "Dark" ? t("mode.Light Mode") : t("mode.Dark Mode")}
      </button>
    </>
  );
}

export default DarkLight;
