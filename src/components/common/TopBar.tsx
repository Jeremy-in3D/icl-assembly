import ListIcon from "@mui/icons-material/List";
import { useAppContext } from "../../context/appContext";

const hebrew = "he";

export const Topbar = ({
  currentLanguage,
  viewedOpeningVid,
  setCurrentLanguage,
}: any) => {
  const { setCurrentStep } = useAppContext();
  return (
    <div className="nav-border">
      <div className="nav-logo-wrapper">
        <img
          src="/assets/images/logo.webp"
          className="icl-logo"
          onClick={() => setCurrentStep(null)}
        />
      </div>
      <div className="top-bar-language-items-container">
        {currentLanguage && viewedOpeningVid ? (
          <img
            style={{
              height: "2em",
              width: "2em",
              borderRadius: "50%",
              marginRight: "1.5em",
              border: "1px solid black",
            }}
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
        <ListIcon fontSize="large" />
      </div>
    </div>
  );
};
