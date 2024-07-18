import { useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import screenfull from "screenfull";
import OpenWithIcon from "@mui/icons-material/OpenWith";

type PdfViewerProps = { question?: number; modalIsOpen: boolean };

export const PdfViewer: React.FC<PdfViewerProps> = ({ question }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleFullscreen = () => {
    if (screenfull.isEnabled && viewerRef && viewerRef.current) {
      screenfull.toggle(viewerRef.current).catch((err) => {
        console.error(
          "Fullscreen API is not supported on this browser/device.",
          err
        );
        setIsFullscreen(!isFullscreen);
      });
    } else {
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div>
      {/* <button
          style={{ background: "black", position: "absolute", zIndex: 5 }}
          onClick={handleFullscreen}
        >
          {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </button> */}
      <div
        ref={viewerRef}
        className={`pdf-wrapper ${isFullscreen ? "fullscreen" : ""}`}
        style={
          isFullscreen
            ? {
                height: isFullscreen ? "100vh" : "62vh",
              }
            : {}
        }
        onDoubleClick={() => handleFullscreen()}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <div
            className="pdf-full-screen-icon"
            onClick={() => handleFullscreen()}
          >
            <OpenWithIcon />
          </div>
          <Viewer
            fileUrl={
              question && question % 2 == 0
                ? "/assets/Waltz_in_C-_Minor_Op._64_No._2.pdf"
                : "/assets/buildchair.pdf"
            }
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
};
