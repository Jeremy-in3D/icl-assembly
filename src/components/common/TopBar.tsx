import ListIcon from "@mui/icons-material/List";
import { useAppContext } from "../../context/appContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { t } from "../../common/t";

// const hebrew = "he";

export const Topbar = ({
  currentLanguage,
  setCurrentLanguage,
  toggleMenu,
  handleChangeLanguage,
}: any) => {
  const { currentStep, openPdf, setOpenPdf } = useAppContext();

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "zh" : "en");
    handleChangeLanguage(currentLanguage === "en" ? "zh" : "en");
  };

  const menuText = t("menu");

  return (
    <div className="nav-actual-container">
      <div className="nav-logo-wrapper">
        <img src="/assets/images/logo.webp" className="icl-logo" />
      </div>

      <div className="top-bar-language-items-container">
        {/* {currentLanguage && ( */}
        <img
          style={{
            height: "2em",
            width: "2em",
            borderRadius: "50%",
            border: "1px solid black",
          }}
          onClick={toggleLanguage}
          src={
            currentLanguage === "en"
              ? "/assets/images/uk.jpg"
              : "/assets/images/Flag_of_the_People's_Republic_of_China.png"
          }
        />
        {/* )} */}

        {/* {currentLanguage && ( */}
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
            <MenuBookIcon fontSize="medium" sx={{ color: "#006a88ff" }} />
          </div>
          <div style={{ color: "white" }}>{t("safetyHBook")}</div>
        </div>
        {/* )} */}

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
            <div style={{ color: "white" }}>{menuText}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
