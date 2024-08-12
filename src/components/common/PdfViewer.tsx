import { useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import screenfull from "screenfull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

type PdfViewerProps = {
  openPdf: string;
  setOpenPdf: React.Dispatch<React.SetStateAction<string>>;
};

export const PdfViewer: React.FC<PdfViewerProps> = ({
  openPdf,
  setOpenPdf,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        className={`pdf-wrapper fullscreen`}
        style={{
          height: "100vh",
        }}
        onDoubleClick={() => handleFullscreen()}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <div
            className="pdf-full-screen-icon"
            onClick={() => {
              // handleFullscreen();
              setOpenPdf("");
            }}
          >
            <CloseFullscreenIcon />
          </div>
          <Viewer
            fileUrl={
              openPdf == "pdf2"
                ? "/assets/Waltz_in_C-_Minor_Op._64_No._2.pdf"
                : "/assets/buildchair.pdf"
            }
          />
        </Worker>
      </div>
    </div>
  );
};
