import { useEffect, useState } from "react";
import { ChooseLanguage } from "./ChooseLanguage";
import { t } from "../common/t";

type LandingPageProps = {
  setViewedOpeningTxt: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  handleChangeLanguage: (lang: string) => void;
};

export function LandingPage({
  setViewedOpeningTxt,
  setCurrentLanguage,
  handleChangeLanguage,
}: LandingPageProps) {
  const [language, setLanguage] = useState<string>("");

  if (language) {
    console.log(language);
  }

  const appStart = language ? (
    <IntroText setViewedOpeningTxt={setViewedOpeningTxt} />
  ) : (
    <ChooseLanguage
      setLanguage={setLanguage}
      setCurrentLanguage={setCurrentLanguage}
      handleChangeLanguage={handleChangeLanguage}
    />
  );
  // );

  return <div style={{ height: "100%" }}>{appStart}</div>;
}

type IntroTextProps = {
  setViewedOpeningTxt: React.Dispatch<React.SetStateAction<boolean>>;
};

const IntroText = ({ setViewedOpeningTxt }: IntroTextProps) => {
  // const [modalIsOpen, setIsOpen] = useState(true);
  const [hasSeenAni, setHasSeenAni] = useState(false);

  useEffect(() => {
    if (!hasSeenAni) {
      setTimeout(() => setHasSeenAni(true), 1000);
    }
  }, []);

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <TextComponent
        setViewedOpeningTxt={setViewedOpeningTxt}
        // setIsOpen={setIsOpen}
        hasSeenAni={hasSeenAni}
      />
    </div>
  );
};

const TextComponent = ({ setViewedOpeningTxt, hasSeenAni }: any) => {
  return (
    <div
      className={` ${hasSeenAni ? "fade-in-stay" : "no-opacity"}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          // color: "black",
          marginTop: "5em",
          fontFamily: "crimson-reg",
          fontSize: "1.3em",
          color: "black",
          width: "96%",
          // padding: "6 .px",
          overflowX: "hidden",
          border: "1px solid rgb(0,0,0,0.6)",
          borderRadius: "12px",
          // padding: "12px",
        }}
      >
        <p style={{ overflowX: "hidden", padding: "6px" }}>
          {/* Welcome to this safety training video, designed to guide operators in
          the proper handling and unloading procedures for Bromine-containing
          Isotanks. Bromine (UN-1744) is a hazardous material, and as such, you
          will encounter various safety labels and warning signs on the Isotank.
          These containers are specially designed for transporting Bromine and
          are internally coated with lead to ensure safe transit. This video
          will walk you through essential safety protocols, including
          preparation, personal protective equipment (PPE), proper unloading
          techniques, and emergency procedures to ensure a safe and efficient
          process. */}
          {t("introText")}
        </p>
        <span style={{ height: "1em", border: "1px solid white" }}></span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        <button
          onClick={() => {
            setViewedOpeningTxt(true);
          }}
          style={{
            // all: "unset",
            borderRadius: "12px",
            border: "1px solid rgb(0,0,0,0.6)",
            padding: "6px",
            fontSize: "1.2em",
            background: "var(--blue3opaque)",
            color: "black",
          }}
        >
          {t("continue")}
        </button>
      </div>
      <div style={{ height: "30px" }}></div>
    </div>
  );
};
