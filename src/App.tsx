import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
// import Homepage from "./components/Homepage";
// import { useTranslation } from "react-i18next";

const LazyHomepage = lazy(() => import("./components/Homepage"));
const hebrew = "he";
// const chinese = 'zh'

function App() {
  // const {
  //   i18n: { changeLanguage, language },
  // } = useTranslation();

  const [viewedOpeningVid, setViewedOpeningVid] = useState<boolean>(false);
  // const [currentLanguage, setCurrentLanguage] = useState(language);
  const [fadeOutHappenedAlready, setFdOutHappenedAlready] = useState(false);
  const [questionaireSelect, setQuestionaireSelect] = useState("");
  const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>("");

  useEffect(() => {
    setTimeout(() => setFdOutHappenedAlready(true), 1900);
  }, []);

  return (
    <>
      {fadeOutHappenedAlready ? null : <div className="tester-two"></div>}
      <Background />
      <Navbar
        setIsAssemble={setIsAssemble}
        questionaireSelect={questionaireSelect}
        currentLanguage={currentLanguage}
        viewedOpeningVid={viewedOpeningVid}
        setCurrentLanguage={setCurrentLanguage}
      />
      {viewedOpeningVid ? (
        <Suspense fallback={null}>
          <LazyHomepage
            setQuestionaireSelect={setQuestionaireSelect}
            isAssemble={isAssemble}
            setIsAssemble={setIsAssemble}
          />
        </Suspense>
      ) : (
        <LandingPage
          setViewedOpeningVid={setViewedOpeningVid}
          setCurrentLanguage={setCurrentLanguage}
        />
      )}
    </>
  );
}

export default App;

const Background = () => (
  <>
    <div className="tester"></div>
    <div
      className="test"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        // background: "grey",
        zIndex: -1,
        display: "flex",
        opacity: 1,
      }}
    >
      <div className="background-one"></div>
      <div className="background-two"></div>
    </div>
  </>
);

const Navbar = ({
  setIsAssemble,
  questionaireSelect,
  currentLanguage,
  viewedOpeningVid,
  setCurrentLanguage,
}: any) => (
  <div
    className="nav-border"
    style={{
      display: "flex",
      justifyContent: "center",
      zIndex: 3,
    }}
  >
    <div className="nav-logo-wrapper">
      <img
        src="/assets/images/logo.webp"
        className="icl-logo"
        onClick={() => setIsAssemble(null)}
      />
      {questionaireSelect ? (
        <div
          className="nav-questionaire-type"
          style={{ color: "white", fontSize: "1.2em" }}
        >
          {questionaireSelect
            ? questionaireSelect == "assemble"
              ? "Assemble"
              : "Dismantle"
            : null}
        </div>
      ) : null}
      {currentLanguage && viewedOpeningVid ? (
        <img
          style={{ height: "2.5em", width: "2.5em", borderRadius: "50%" }}
          onClick={() =>
            setCurrentLanguage(currentLanguage == hebrew ? "zh" : "he")
          }
          src={
            currentLanguage == hebrew
              ? "/assets/images/israel-flag.png"
              : "/assets/images/Flag_of_the_People's_Republic_of_China.png"
          }
        />
      ) : null}
    </div>
  </div>
);
