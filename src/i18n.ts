import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import heJSON from "./common/textHe.json";
import zhJSON from "./common/textZh.json";

i18n.use(initReactI18next).init({
  resources: {
    he: { ...heJSON },
    zh: { ...zhJSON },
  }, // Where we're gonna put translations' files
  lng: "he", // Set the initial language of the App
});
