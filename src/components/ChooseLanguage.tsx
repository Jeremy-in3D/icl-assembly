import { useState } from "react";
// import { t } from "../common/t";

type ChooseLanguageProps = {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  handleChangeLanguage: (lang: string) => void;
};

const languages = [
  {
    code: "en",
    label: "English",
    image: "/assets/images/closeup-union-jack-flag.jpg",
    animation: "move-and-fade",
  },
  {
    code: "zh",
    label: "中文",
    image: "/assets/images/china-flag.webp",
    animation: "move-and-fade-backwards",
  },
  {
    code: "kr",
    label: "한국어",
    image: "/assets/images/south-korean-detailed.jpg",
    animation: "move-and-fade-backwards",
  },
  // Add more languages here as needed
];

export const ChooseLanguage = ({
  setLanguage,
  setCurrentLanguage,
  handleChangeLanguage,
}: ChooseLanguageProps) => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleLanguagePick = (language: string) => {
    setClickedButton(language);
    setTimeout(() => {
      setLanguage(language);
      setCurrentLanguage(language);
    }, 1600);
    handleChangeLanguage(language);
  };

  return (
    <div className="homepage-wrapper">
      <div style={{ height: "100px" }}></div>
      <div className="choose-language-wrapper">
        <div style={{ textAlign: "center" }}></div>
        <div className="languages-container">
          {languages.map((lang) => (
            <div key={lang.code}>
              <button
                className={[
                  "language-flag",
                  clickedButton === lang.code
                    ? lang.animation
                    : clickedButton
                    ? "fade-out-now"
                    : "",
                ].join(" ")}
                style={{
                  backgroundImage: `url('${lang.image}')`,
                }}
                onClick={() => handleLanguagePick(lang.code)}
                aria-label={lang.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
