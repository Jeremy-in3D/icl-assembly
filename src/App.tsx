import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { Topbar } from "./components/common/TopBar";
import { SlideMenu } from "./components/common/Menu";
import { useAppContext } from "./context/appContext";
import { PdfViewer } from "./components/common/PdfViewer";

// import Homepage from "./components/Homepage";
import { useTranslation } from "react-i18next";

const LazyHomepage = lazy(() => import("./components/Homepage"));
// const chinese = 'zh'

function App() {
  const { i18n } = useTranslation();
  // useTranslation();

  const [viewedOpeningTxt, setViewedOpeningTxt] = useState<boolean>(false);
  // const [currentLanguage, setCurrentLanguage] = useState(language);
  const [fadeOutHappenedAlready, setFdOutHappenedAlready] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("");
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { menuOpen, setMenuOpen, openPdf } = useAppContext();

  console.log({ currentLanguage });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

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

  useEffect(() => {
    setCurrentLanguage(i18n.language ? i18n.language : "en"); // Ensure it syncs with the active language
  }, [i18n.language]);

  return (
    <>
      {fadeOutHappenedAlready ? null : (
        <div className="fade-out-animation"></div>
      )}
      <Background />

      {currentLanguage ? (
        <Topbar
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          toggleMenu={toggleMenu}
          handleChangeLanguage={handleChangeLanguage}
        />
      ) : null}

      {viewedOpeningTxt ? (
        <Suspense fallback={null}>
          <LazyHomepage />
        </Suspense>
      ) : (
        <LandingPage
          setViewedOpeningTxt={setViewedOpeningTxt}
          setCurrentLanguage={setCurrentLanguage}
          handleChangeLanguage={handleChangeLanguage}
        />
      )}
      {openPdf ? (
        <Suspense fallback={null}>
          <PdfViewer />
        </Suspense>
      ) : null}
      {menuOpen ? <SlideMenu toggleMenu={toggleMenu} /> : null}
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
