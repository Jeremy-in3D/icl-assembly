import { useRef, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import screenfull from "screenfull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useAppContext } from "../../context/appContext";

type PdfViewerProps = {
  currentLanguage: string;
};
export const PdfViewer: React.FC<PdfViewerProps> = ({ currentLanguage }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { setOpenPdf } = useAppContext();

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
              setOpenPdf(false);
            }}
          >
            <CloseFullscreenIcon />
          </div>
          <Viewer
            fileUrl={
              currentLanguage == "kr"
                ? "/assets/BROMINE_SHB_2022_Kor_compressed.pdf"
                : currentLanguage == "zh"
                ? "/assets/Bromine_sfty_zh.pdf"
                : "/assets/Bromine Safety HandBook-compressed-2.pdf"
            }
          />
        </Worker>
      </div>
    </div>
  );
};
