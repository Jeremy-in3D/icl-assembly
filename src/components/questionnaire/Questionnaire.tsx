import { useRef, useState } from "react";
import { VideoPlayer } from "../VideoPlayer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Modal from "react-modal";
import TaskIcon from "@mui/icons-material/Task";
import { PdfViewer } from "../common/PdfViewer";

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
          <>
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
          </>
        ) : !modalIsOpen ? (
          <div
            style={{ border: "1px solid rgb(0,0,0,0.4)", borderRadius: "4px" }}
          >
            <ImageViewer
              src={`/assets/images/${
                surveyOption == 1 || surveyOption == 4
                  ? "assemble_dismantle.webp"
                  : "automation.jpg"
              }`}
            />
          </div>
        ) : null}
        <TextBox />
        <button
          style={{ width: "6em", marginTop: ".5em" }}
          className="prev-next-btn"
          onClick={() => {
            setIsPdfModal(true);
            openModal();
          }}
        >
          PDF's
        </button>
      </div>

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
        <div
          style={{
            // left: "83%",
            bottom: "1.5em",
            fontSize: "1.5em",
            color: "rgb(255, 255, 255, 0.8)",
          }}
        >
          {`${surveyOption}/10`}
        </div>
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
          {surveyOption == 10 ? (
            "Complete"
          ) : (
            <NavigateNextIcon fontSize="large" />
          )}
        </button>
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
}: any) => (
  <>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      onAfterClose={() => setIsPdfModal(false)}
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
          <button onClick={() => setOpenPdf("pdf1")} className="prev-next-btn">
            PDF 1
          </button>
          <button
            style={{ marginTop: "1em" }}
            onClick={() => setOpenPdf("pdf2")}
            className="prev-next-btn"
          >
            PDF 2
          </button>
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

// const PdfViewer: React.FC = () => {
//   const viewerRef = useRef<HTMLDivElement>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const handleFullscreen = () => {
//     if (screenfull.isEnabled && viewerRef && viewerRef.current) {
//       screenfull.toggle(viewerRef.current).catch((err) => {
//         console.error(
//           "Fullscreen API is not supported on this browser/device.",
//           err
//         );
//         setIsFullscreen(!isFullscreen);
//       });
//     } else {
//       setIsFullscreen(!isFullscreen);
//     }
//   };

//   return (
//     <div>
//       {/* <button
//         style={{ background: "black", position: "absolute", zIndex: 5 }}
//         onClick={handleFullscreen}
//       >
//         {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
//       </button> */}
//       <div
//         ref={viewerRef}
//         className={isFullscreen ? "fullscreen" : ""}
//         style={{
//           height: isFullscreen ? "100vh" : "70vh",
//           width: "100%",
//           overflow: "auto",
//         }}
//         // onClick={() => {
//         //   console.log("Worker clicked");
//         //   handleFullscreen();
//         // }}
//         onDoubleClick={() => handleFullscreen()}
//       >
//         <Worker
//           workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//         >
//           <Viewer
//             fileUrl="/assets/Waltz_in_C-_Minor_Op._64_No._2.pdf"
//             plugins={[defaultLayoutPluginInstance]}
//           />
//         </Worker>
//       </div>
//     </div>
//   );
// };

type ImageViewerProps = { src: string };
const ImageViewer = ({ src }: ImageViewerProps) => {
  return <img src={src} alt="" style={{ height: "100%", width: "100%" }} />;
};

const TextBox = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "rgb(0,0,0,0.4)",
      borderRadius: "12px",
      padding: "4px",
      height: "100%",
      marginTop: "1em",
      width: "100%",
    }}
  >
    <div className="questionaire-text">A TextBox/Description</div>
    {/* <div
      style={{
        width: "50%",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1em",
      }}
    >
      <button className="prev-next-btn">True</button>
      <button className="prev-next-btn">False</button>
    </div> */}
  </div>
);
