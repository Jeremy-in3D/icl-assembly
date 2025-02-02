import ListIcon from "@mui/icons-material/List";
import { useAppContext } from "../../context/appContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const hebrew = "he";

export const Topbar = ({
  currentLanguage,
  setCurrentLanguage,
  toggleMenu,
}: any) => {
  const { currentStep, openPdf, setOpenPdf } = useAppContext();
  return (
    // <div className="nav-outer-wrapper">
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

        {currentLanguage ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                height: "2em",
                width: "2em",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                background: "rgb(255,255,255,0.9)",
              }}
              onClick={() => setOpenPdf(!openPdf)}
            >
              <div>
                <MenuBookIcon fontSize="medium" sx={{ color: "#006a88ff" }} />
              </div>
            </div>
            <div style={{ color: "white" }}>Safety Handbook</div>
          </div>
        ) : null}

        {currentStep ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                height: "2em",
                width: "2em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgb(255,255,255,0.9)",
              }}
              onClick={toggleMenu}
            >
              <ListIcon
                className="fade-in-ani"
                fontSize="medium"
                sx={{ color: "#006a88ff" }}
              />
            </div>
            <div style={{ color: "white" }}>Menu</div>
          </div>
        ) : null}
      </div>
    </div>
    // </div>
  );
};
