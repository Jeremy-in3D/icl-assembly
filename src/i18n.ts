import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from "./common/textEn.json";
import zhJSON from "./common/textZh.json";
import krJSON from "./common/textKr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    zh: { ...zhJSON },
    kr: { ...krJSON },
  }, // Where we're gonna put translations' files
  lng: "en", // Set the initial language of the App
});
