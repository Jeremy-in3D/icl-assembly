import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
// import Homepage from "./components/Homepage";
// import { useTranslation } from "react-i18next";

const LazyHomepage = lazy(() => import("./components/Homepage"));

function App() {
  // const {
  //   i18n: { changeLanguage, language },
  // } = useTranslation();

  const [viewedOpeningVid, setViewedOpeningVid] = useState<boolean>(false);
  // const [currentLanguage, setCurrentLanguage] = useState(language);
  const [fadeOutHappenedAlready, setFdOutHappenedAlready] = useState(false);
  const [questionaireSelect, setQuestionaireSelect] = useState("");

  useEffect(() => {
    setTimeout(() => setFdOutHappenedAlready(true), 1900);
  }, []);

  return (
    <>
      {fadeOutHappenedAlready ? null : <div className="tester-two"></div>}
      <Background />
      <div
        className="nav-border"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",

            width: "90%",
          }}
        >
          <img
            src="/assets/images/logo.webp"
            // style={{ height: "50%", marginLeft: "2em" }}
            className="icl-logo"
          />
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
        </div>
      </div>
      {viewedOpeningVid ? (
        <Suspense fallback={null}>
          <LazyHomepage setQuestionaireSelect={setQuestionaireSelect} />
        </Suspense>
      ) : (
        <LandingPage setViewedOpeningVid={setViewedOpeningVid} />
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
