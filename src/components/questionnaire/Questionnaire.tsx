import { useRef, useState } from "react";
import { VideoPlayer } from "../VideoPlayer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Modal from "react-modal";
import TaskIcon from "@mui/icons-material/Task";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import screenfull from "screenfull";
import { PdfViewer } from "../common/PdfViewer";

Modal.setAppElement("#root");
type QuestionaireProps = {
  isAssemble: boolean | null;
  setIsAssemble: React.Dispatch<React.SetStateAction<boolean | null>>;
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

export function Questionaire({ isAssemble, setIsAssemble }: QuestionaireProps) {
  const [surveyOption, setSurveyOption] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState(false);
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
    <div
      style={{
        height: "100%",
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "6em",
      }}
    >
      {/* <div>
        <h1>{isAssemble ? "Assemble" : "Dismantle"}</h1>
      </div> */}

      <div style={{ width: "96%" }}>
        {surveyOption == 2 || surveyOption == 6 || surveyOption == 8 ? (
          <>
            <VideoPlayer
              height={"18em"}
              startTime={0}
              videoRef={videoRef}
              src={
                surveyOption == 6
                  ? "/assets/video/darluke.mp4"
                  : "/assets/video/Mesh Hololens - Remote Collaboration.mp4"
              }
              videoFit="contain"
            />
            {surveyOption == 2 ? (
              <div
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgb(0,0,0,0.4)",
                  borderRadius: "12px",
                  padding: "4px",
                }}
              >
                <div className="questionaire-text">A description/question</div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1em",
                  }}
                >
                  <button className="prev-next-btn">True</button>
                  <button className="prev-next-btn">False</button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <PdfViewer />
        )}
      </div>

      <div className="prev-next-survey-wrapper">
        <button
          onClick={() =>
            surveyOption > 1 ? setSurveyOption(surveyOption - 1) : null
          }
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
            color: "black",
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
        {/* <button onClick={openModal}>Open Modal</button> */}
        <ModalComponent
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          setIsAssemble={setIsAssemble}
        />
      </div>
    </div>
  );
}

const ModalComponent = ({ closeModal, modalIsOpen, setIsAssemble }: any) => (
  <>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "gotham-bold",
            textAlign: "center",
            color: "black",
            // border: "1px solid black",
            // height: "100%",
            fontSize: "1.2em",
            padding: "4px",
          }}
        >
          Complete!
        </div>
        <div>
          <TaskIcon sx={{ color: "rgb(52, 178, 51, 0.8)", fontSize: "4em" }} />
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
            }}
          >
            Close
          </button>
        </div>
      </div>
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
