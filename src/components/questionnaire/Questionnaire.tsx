import React, { useRef, useState } from "react";
import { VideoPlayer } from "../VideoPlayer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Modal from "react-modal";
import TaskIcon from "@mui/icons-material/Task";
// import { PdfViewer } from "../common/PdfViewer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ListIcon from "@mui/icons-material/List";

Modal.setAppElement("#root");
type QuestionaireProps = {
  isAssemble: boolean | null;
  setIsAssemble: React.Dispatch<React.SetStateAction<boolean | null>>;
  setQuestionaireSelect: React.Dispatch<React.SetStateAction<string>>;
  setOpenPdf: React.Dispatch<React.SetStateAction<string>>;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "15em",
    width: "15em",
    background: "var(--blue1opaque)",
    border: "1px solid black",
  },
};

const MAX_NUM_OF_QUESTIONS = 10;

export function Questionaire({
  isAssemble,
  setIsAssemble,
  setQuestionaireSelect,
  setOpenPdf,
}: QuestionaireProps) {
  const [surveyOption, setSurveyOption] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isPdfModal, setIsPdfModal] = useState(false);
  const [isDescriptionModal, setIsDescriptionModal] = useState(false);
  // const [isTrueClicked, setIsTrueClicked] = useState(null);

  const videoRef = useRef(null);

  console.log(isAssemble);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="questionaire-wrapper">
      <div className="questionaire-content-container">
        {surveyOption == 2 || surveyOption == 6 || surveyOption == 8 ? (
          <div className="questionaire-video-wrapper">
            <VideoPlayer
              // height={"18em"}
              isQuestionaire
              startTime={0}
              videoRef={videoRef}
              src={
                surveyOption == 6
                  ? "/assets/video/What can HoloLens 2 do_.mp4"
                  : "/assets/video/Mesh Hololens - Remote Collaboration.mp4"
              }
              videoFit="contain"
              question={surveyOption}
            />
          </div>
        ) : !modalIsOpen ? (
          <div className="img-viewer-wrapper">
            <ImageViewer
              src={`/assets/images/${
                surveyOption == 1 || surveyOption == 4 || surveyOption == 10
                  ? "assemble_dismantle.webp"
                  : "automation.jpg"
              }`}
            />
          </div>
        ) : null}
      </div>
      <div
        className="questionaire-text-counter-wrapper"
        // style={{ all: "unset" }}
      >
        <TextBox
          setIsPdfModal={setIsPdfModal}
          openModal={openModal}
          setIsDescriptionModal={setIsDescriptionModal}
        />
        <QuestionaireMenu
          surveyOption={surveyOption}
          setSurveyOption={setSurveyOption}
        />

        <Counter
          surveyOption={surveyOption}
          setSurveyOption={setSurveyOption}
          openModal={openModal}
        />
      </div>
      <div>
        <ModalComponent
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          setIsAssemble={setIsAssemble}
          setQuestionaireSelect={setQuestionaireSelect}
          isPdfModal={isPdfModal}
          setOpenPdf={setOpenPdf}
          setIsPdfModal={setIsPdfModal}
          isDescriptionModal={isDescriptionModal}
          setIsDescriptionModal={setIsDescriptionModal}
        />
      </div>
    </div>
  );
}

const ModalComponent = ({
  closeModal,
  modalIsOpen,
  setIsAssemble,
  setQuestionaireSelect,
  isPdfModal,
  setOpenPdf,
  setIsPdfModal,
  isDescriptionModal,
  setIsDescriptionModal,
}: any) => (
  <>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      onAfterClose={() => {
        setIsPdfModal(false);
        setIsDescriptionModal(false);
      }}
      // sty
    >
      {isPdfModal ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            style={{ width: "7em" }}
            onClick={() => setOpenPdf("pdf1")}
            className="prev-next-btn"
          >
            PDF 1
          </button>
          <button
            style={{ marginTop: "1em", width: "7em" }}
            onClick={() => setOpenPdf("pdf2")}
            className="prev-next-btn"
          >
            PDF 2
          </button>
        </div>
      ) : isDescriptionModal ? (
        <div style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}>
          Some description
        </div>
      ) : (
        <div className="modal-complete-container">
          <div className="completed-msg-wrapper">Complete!</div>
          <div>
            <TaskIcon
              sx={{ color: "rgb(52, 178, 51, 0.8)", fontSize: "4em" }}
            />
          </div>
          <div>
            <button
              style={{
                borderRadius: "12px",
                color: "white",
                width: "7em",
                height: "1.8em",
                background: "var(--blue5opaque)",
              }}
              onClick={() => {
                closeModal();
                setIsAssemble(null);
                setQuestionaireSelect("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  </>
);

type ImageViewerProps = { src: string };

const ImageViewer = ({ src }: ImageViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when the image is fully loaded
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to make the loader more visible
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <img
        src={src}
        alt="alt"
        onLoad={handleImageLoad} // Triggered when the image is fully loaded
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          display: isLoading ? "none" : "block", // Hide the image until it is loaded
        }}
      />
    </div>
  );
};
const TextBox = ({ setIsPdfModal, openModal, setIsDescriptionModal }: any) => (
  <div
    style={
      {
        // visibility: "hidden",
      }
    }
    className="questionaire-textbox-wrapper"
  >
    <div className="questionare-pdfs-container">
      <button
        style={{ width: "44%" }}
        className="prev-next-btn"
        onClick={() => {
          setIsPdfModal(true);
          openModal();
        }}
      >
        PDF's
      </button>
      <button
        style={{ width: "44%" }}
        className="prev-next-btn"
        onClick={() => {
          setIsDescriptionModal(true);
          openModal();
        }}
      >
        Description
      </button>
    </div>

    {/* <div className="questionaire-text">TextBox/Description</div> */}
  </div>
);

const Counter = ({ surveyOption, setSurveyOption, openModal }: any) => (
  <div className="prev-next-survey-wrapper">
    <button
      onClick={() =>
        surveyOption > 1 ? setSurveyOption(surveyOption - 1) : null
      }
      style={{ opacity: surveyOption == 1 ? 0.4 : 1 }}
      className="prev-next-btn"
    >
      <NavigateBeforeIcon fontSize="large" />
      {/* Previous */}
    </button>
    <div className="questionaire-counter">{`${surveyOption}/10`}</div>
    <button
      className="prev-next-btn"
      onClick={
        surveyOption == MAX_NUM_OF_QUESTIONS
          ? () => openModal()
          : () => {
              surveyOption < MAX_NUM_OF_QUESTIONS
                ? setSurveyOption(surveyOption + 1)
                : null;
            }
      }
    >
      {/* Next */}
      {surveyOption == 10 ? "Complete" : <NavigateNextIcon fontSize="large" />}
    </button>
  </div>
);

type QuestionaireMenuProps = {
  surveyOption: number;
  setSurveyOption: React.Dispatch<React.SetStateAction<number>>;
};

const QuestionaireMenu = ({
  surveyOption,
  setSurveyOption,
}: QuestionaireMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);

  return (
    <>
      <div>
        <button
          onClick={() => setMenuOpen(true)}
          className="questionair-all-items-btn"
        >
          <ListIcon style={{ marginRight: "0.5em" }} /> All Items
        </button>
      </div>
      {menuOpen ? (
        <div
          onClick={() => setMenuOpen(false)}
          className="menu-open-content-cover"
        >
          hello world
        </div>
      ) : null}
      <div
        className={`questionaire-items-menu-open ${
          menuOpen ? "questainre-open" : ""
        }`}
      >
        <div style={{ height: "6em" }}>
          <button
            style={{
              all: "unset",
              position: "absolute",
              right: "1em",
              top: "0.8em",
            }}
            onClick={() => setMenuOpen(false)}
          >
            <ListIcon fontSize="large" />
          </button>
        </div>
        <div style={{ height: "100%" }}>
          <div>
            <ul>
              {items.map((item, index) => (
                <li
                  onClick={() => setSurveyOption(index + 1)}
                  style={surveyOption === index + 1 ? { color: "white" } : {}}
                  className="menu-open-list-item"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
