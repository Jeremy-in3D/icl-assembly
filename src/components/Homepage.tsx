import { useState } from "react";
import { Questionaire } from "./questionnaire/Questionnaire";
import { PdfViewer } from "./common/PdfViewer";

function Homepage({ setQuestionaireSelect, isAssemble, setIsAssemble }: any) {
  // const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  const [openPdf, setOpenPdf] = useState<string>("");
  return (
    <div className="homepage-wrapper">
      {openPdf ? <PdfViewer openPdf={openPdf} setOpenPdf={setOpenPdf} /> : null}
      {isAssemble === null ? (
        <SelectType
          setIsAssemble={setIsAssemble}
          setQuestionaireSelect={setQuestionaireSelect}
        />
      ) : (
        <Questionaire
          isAssemble={isAssemble}
          setIsAssemble={setIsAssemble}
          setQuestionaireSelect={setQuestionaireSelect}
          setOpenPdf={setOpenPdf}
        />
      )}
      {isAssemble === null ? (
        <div className="hmpg-btns-container">
          <div className="homepage-pdf-btns-wrapper">
            <button
              onClick={() => setOpenPdf("pdf1")}
              className="prev-next-btn telp"
            >
              PDF 1
            </button>
            <button
              onClick={() => setOpenPdf("pdf2")}
              className="prev-next-btn telp"
            >
              PDF 2
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Homepage;

type SelectTypeProps = {
  setIsAssemble: React.Dispatch<React.SetStateAction<boolean | null>>;
  setQuestionaireSelect: React.Dispatch<React.SetStateAction<string>>;
};

const SelectType = ({
  setIsAssemble,
  setQuestionaireSelect,
}: SelectTypeProps) => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleLanguagePick = (selectedOption: string) => {
    setClickedButton(selectedOption);
    setTimeout(() => {
      setIsAssemble(selectedOption === "assemble" ? true : false);
    }, 1600);
  };

  // const assembleClassName =

  return (
    <div className="select-type-container-wrapper">
      <div className="assemble-dismantle-wrapper">
        <AssembleBtn
          clickedButton={clickedButton}
          handleLanguagePick={handleLanguagePick}
          isAssemble
          setQuestionaireSelect={setQuestionaireSelect}
        />
        <DismantleBtn
          clickedButton={clickedButton}
          handleLanguagePick={handleLanguagePick}
          setQuestionaireSelect={setQuestionaireSelect}
        />
      </div>
    </div>
  );
};

type BtnProps = {
  clickedButton: string | null;
  handleLanguagePick: (selectedOption: string) => void;
  isAssemble?: any;
  setQuestionaireSelect: React.Dispatch<React.SetStateAction<string>>;
};

const AssembleBtn = ({
  clickedButton,
  handleLanguagePick,
  setQuestionaireSelect,
}: // isAssemble,
BtnProps) => (
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
      onClick={() => {
        handleLanguagePick("assemble");
        setQuestionaireSelect("assemble");
      }}
    >
      <h1 style={{ color: "black" }}>Assemble</h1>
    </button>
  </div>
);

const DismantleBtn = ({
  clickedButton,
  handleLanguagePick,
  setQuestionaireSelect,
}: BtnProps) => (
  <div>
    <button
      style={{
        border: "1px solid black",
        textAlign: "center",
        borderRadius: "12px",
      }}
      onClick={() => {
        handleLanguagePick("dismantle");
        setQuestionaireSelect("dismantle");
      }}
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
