// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations for your languages
import translationEN from "./locales/en.json";
import translationSV from "./locales/sv.json";

const initializeI18n = async (): Promise<void> => {
  await i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
      debug: import.meta.env.DEV,
      fallbackLng: "sv",
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      resources: {
        sv: {
          translation: translationSV,
        },
        en: {
          translation: translationEN,
        },
      },
    });
};

const setLanguage = (language: string): void => {
  if (i18n.language !== language) {
    void i18n.changeLanguage(language);
  }
};

export { i18n, initializeI18n, setLanguage };
