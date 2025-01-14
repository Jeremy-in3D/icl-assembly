import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { Topbar } from "./components/common/TopBar";

// import Homepage from "./components/Homepage";
// import { useTranslation } from "react-i18next";

const LazyHomepage = lazy(() => import("./components/Homepage"));
// const chinese = 'zh'

function App() {
  // const {
  //   i18n: { changeLanguage, language },
  // } = useTranslation();

  const [viewedOpeningVid, setViewedOpeningVid] = useState<boolean>(false);
  // const [currentLanguage, setCurrentLanguage] = useState(language);
  const [fadeOutHappenedAlready, setFdOutHappenedAlready] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("");

  useEffect(() => {
    const updateHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    setTimeout(() => setFdOutHappenedAlready(true), 1900);
  }, []);

  return (
    <>
      {fadeOutHappenedAlready ? null : (
        <div className="fade-out-animation"></div>
      )}
      <Background />
      <Topbar
        currentLanguage={currentLanguage}
        viewedOpeningVid={viewedOpeningVid}
        setCurrentLanguage={setCurrentLanguage}
      />
      {viewedOpeningVid ? (
        <Suspense fallback={null}>
          <LazyHomepage />
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
        height: "100%",
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
