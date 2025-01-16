import ListIcon from "@mui/icons-material/List";
import { useAppContext } from "../../context/appContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const hebrew = "he";

export const Topbar = ({
  currentLanguage,
  viewedOpeningVid,
  setCurrentLanguage,
  toggleMenu,
}: any) => {
  const { currentStep, openPdf, setOpenPdf } = useAppContext();
  return (
    <div className="nav-outer-wrapper">
      <div className="nav-actual-container">
        <div className="nav-logo-wrapper">
          <img
            src="/assets/images/logo.webp"
            className="icl-logo"
            // onClick={() => setCurrentStep(null)}
          />
        </div>
        <div className="top-bar-language-items-container">
          {currentLanguage ? (
            <img
              style={{
                height: "2em",
                width: "2em",
                borderRadius: "50%",
                // marginRight: "1.5em",
                border: "1px solid black",
              }}
              onClick={() =>
                setCurrentLanguage(currentLanguage == hebrew ? "zh" : "he")
              }
              src={
                currentLanguage == hebrew
                  ? "/assets/images/uk.jpg"
                  : "/assets/images/Flag_of_the_People's_Republic_of_China.png"
              }
            />
          ) : null}
          <div>
            <MenuBookIcon
              fontSize="large"
              onClick={() => setOpenPdf(!openPdf)}
            />
          </div>
          {viewedOpeningVid && currentStep ? (
            <ListIcon
              className="fade-in-ani"
              fontSize="large"
              onClick={toggleMenu}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
