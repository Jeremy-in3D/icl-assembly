import { useState } from "react";
// import { t } from "../common/t";

type ChooseLanguageProps = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};
export const ChooseLanguage = ({ setLanguage }: ChooseLanguageProps) => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleLanguagePick = (language: string) => {
    setClickedButton(language);
    setTimeout(() => {
      setLanguage(language);
    }, 1600);
  };

  return (
    <div className="homepage-wrapper">
      <div className="choose-language-wrapper">
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              color: "#002846ff",
              marginTop: "5.5em",
              fontFamily: "gotham",
              fontSize: "2.2em",
            }}
          >
            {/* Please select a languagef */}
            {/* {t("pleaseSelectLanguage")} */}
          </h3>
        </div>
        <div className="languages-container">
          <div>
            <button
              className={`language-flag ${
                clickedButton === "he"
                  ? "move-and-fade"
                  : clickedButton
                  ? "fade-out-now"
                  : ""
              }`}
              onClick={() => handleLanguagePick("he")}
            ></button>
          </div>
          <div>
            <button
              className={`language-flag secondLanguage-flag ${
                clickedButton === "zh"
                  ? "move-and-fade-backwards"
                  : clickedButton
                  ? "fade-out-now"
                  : ""
              }`}
              onClick={() => handleLanguagePick("zh")}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
