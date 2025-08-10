import ListIcon from "@mui/icons-material/List";
import { useAppContext } from "../../context/appContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { t } from "../../common/t";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
// const hebrew = "he";

const LANGUAGE_OPTIONS = [
  {
    code: "en",
    label: "En",
    flagSrc: "/assets/images/uk.jpg",
  },
  {
    code: "zh",
    label: "Zh",
    flagSrc: "/assets/images/Flag_of_the_People's_Republic_of_China.png",
  },
  {
    code: "kr",
    label: "Kr",
    flagSrc: "/assets/images/Capture_sk.PNG",
  },
];

type TopbarProps = {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  toggleMenu: () => void;
  handleChangeLanguage: (lang: string) => void;
};

export const Topbar: React.FC<TopbarProps> = ({
  currentLanguage,
  setCurrentLanguage,
  toggleMenu,
  handleChangeLanguage,
}) => {
  const { currentStep, openPdf, setOpenPdf } = useAppContext();

  // State for Material-UI menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const currentOption =
    LANGUAGE_OPTIONS.find((l) => l.code === currentLanguage) ||
    LANGUAGE_OPTIONS[0];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (code: string) => {
    setCurrentLanguage(code);
    handleChangeLanguage(code); // sync with your i18n logic
    handleMenuClose();
  };

  const menuText = t("menu");

  return (
    <div className="nav-actual-container">
      <div className="nav-logo-wrapper">
        <img src="/assets/images/logo.webp" className="icl-logo" />
      </div>

      <div className="top-bar-language-items-container">
        {/* Language Dropdown (using MUI Menu) */}
        <IconButton
          onClick={handleMenuOpen}
          size="small"
          sx={{
            p: 0,
            // border: "1px solid black",
            borderRadius: "50%",
            // backgroundColor: "white",
            marginRight: "1em",
          }}
        >
          <img
            src={currentOption.flagSrc}
            alt={currentOption.label}
            style={{ height: "2em", width: "2em", borderRadius: "50%" }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <MenuItem
              key={option.code}
              selected={option.code === currentLanguage}
              onClick={() => handleLanguageSelect(option.code)}
            >
              <img
                src={option.flagSrc}
                alt={option.label}
                style={{
                  height: "1.5em",
                  width: "1.5em",
                  borderRadius: "50%",
                  marginRight: 8,
                  border: "1px solid #555",
                }}
              />
              {option.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Book Icon (PDF Toggle) */}
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
          <div
            style={{
              color: "white",
              width: "10em",
              textAlign: "center",
            }}
          >
            {t("safetyHBook")}
          </div>
        </div>

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
