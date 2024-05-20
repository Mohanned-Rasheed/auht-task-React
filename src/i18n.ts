import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../src/lang/en.json";
import ar from "../src/lang/ar.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: window.localStorage.getItem("lang") || "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
