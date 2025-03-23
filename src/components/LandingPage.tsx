import { useEffect, useState, useRef } from "react";
import { ChooseLanguage } from "./ChooseLanguage";
import { t } from "../common/t";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
  const [isAtTop, setIsAtTop] = useState(true);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (divRef.current) {
      setIsAtTop(divRef.current.scrollTop === 0);
    }
  };

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);

      // Cleanup scroll event listener on component unmount
      return () => {
        div.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div
      className={` ${hasSeenAni ? "fade-in-stay" : "no-opacity"}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        ref={divRef}
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
          position: "relative",
        }}
      >
        <p
          style={{
            overflowX: "hidden",
            padding: "6px",
          }}
        >
          {t("introText")}
        </p>
        <span style={{ height: "1em", border: "1px solid white" }}></span>
        {isAtTop && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "24px",
              pointerEvents: "none",
              zIndex: 10,
              background: "rgb(0,0,0,0.9)",
              display: "flex",
              borderRadius: "50%",
            }}
          >
            <ArrowDownwardIcon fontSize="medium" sx={{ color: "white" }} />
          </div>
        )}
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
      <div style={{ width: "96%" }}>
        <p style={{ color: "red", padding: "6px", fontSize: "1.2em" }}>
          {t("disclaimer")}
        </p>
      </div>
      <div style={{ height: "30px" }}></div>
    </div>
  );
};
