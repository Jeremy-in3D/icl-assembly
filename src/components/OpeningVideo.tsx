import { useRef } from "react";
import { VideoPlayer } from "./VideoPlayer";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { t } from "../common/t";

type OpeningVideoProps = {
  setViewedOpeningVid: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OpeningVideo = ({ setViewedOpeningVid }: OpeningVideoProps) => {
  const openingVideoRef = useRef(null);
  return (
    <div style={{ height: "100vh" }}>
      <button
        className="skip-vid-container"
        onClick={() => setViewedOpeningVid(true)}
      >
        {/* skip */}
        {t("skip")}
        <SkipNextIcon fontSize="large" />
      </button>
      <VideoPlayer
        // height="20em"
        // height="100%"
        src={"/assets/video/Mesh Hololens - Remote Collaboration.mp4"}
        startTime={0}
        videoRef={openingVideoRef}
      />
    </div>
  );
};
