import { useState } from "react";
import { Questionaire } from "./questionnaire/Questionnaire";

export function Homepage() {
  const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  return (
    <div style={{ height: "100vh" }}>
      {isAssemble === null ? (
        <SelectType setIsAssemble={setIsAssemble} />
      ) : (
        <Questionaire isAssemble={isAssemble} setIsAssemble={setIsAssemble} />
      )}
    </div>
  );
}

type SelectTypeProps = {
  setIsAssemble: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const SelectType = ({ setIsAssemble }: SelectTypeProps) => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleLanguagePick = (selectedOption: string) => {
    setClickedButton(selectedOption);
    setTimeout(() => {
      setIsAssemble(selectedOption === "assemble" ? true : false);
    }, 1600);
  };

  // const assembleClassName =

  return (
    <div className="assemble-dismantle-wrapper">
      <AssembleBtn
        clickedButton={clickedButton}
        handleLanguagePick={handleLanguagePick}
        isAssemble
      />
      <DismantleBtn
        clickedButton={clickedButton}
        handleLanguagePick={handleLanguagePick}
      />
    </div>
  );
};

type BtnProps = {
  clickedButton: string | null;
  handleLanguagePick: (selectedOption: string) => void;
  isAssemble?: any;
};

const AssembleBtn = ({
  clickedButton,
  handleLanguagePick,
  isAssemble,
}: BtnProps) => (
  <div>
    <button
      style={{
        border: "1px solid black",
        textAlign: "center",
        borderRadius: "12px",
      }}
      className={`assemble-dismantle-option ${
        clickedButton === "assemble"
          ? "move-and-fade"
          : clickedButton
          ? "fade-out-now"
          : ""
      }`}
      onClick={() => handleLanguagePick("assemble")}
    >
      <h1 style={{ color: "black" }}>Assemble</h1>
    </button>
  </div>
);

const DismantleBtn = ({ clickedButton, handleLanguagePick }: BtnProps) => (
  <div>
    <button
      style={{
        border: "1px solid black",
        textAlign: "center",
        borderRadius: "12px",
      }}
      onClick={() => handleLanguagePick("dismantle")}
      className={`assemble-dismantle-option dismantle-btn ${
        clickedButton === "dismantle"
          ? "move-and-fade-backwards"
          : clickedButton
          ? "fade-out-now"
          : ""
      }`}
    >
      <h1 style={{ color: "black" }}>Dismantle </h1>
    </button>
  </div>
);
