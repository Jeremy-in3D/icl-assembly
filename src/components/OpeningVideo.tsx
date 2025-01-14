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
    <div style={{ height: "89.3%", position: "absolute" }}>
      <button
        className="skip-vid-container"
        onClick={() => setViewedOpeningVid(true)}
      >
        {t("skip")}
        <SkipNextIcon fontSize="large" />
      </button>
      <VideoPlayer
        // height="20em"
        // height="100%"
        src="/assets/video/5_compressed.mp4" //{"/assets/video/Mesh Hololens - Remote Collaboration.mp4"}
        startTime={0}
        videoRef={openingVideoRef}
        setViewedOpeningVid={setViewedOpeningVid}
        isOpeningVid
      />
    </div>
  );
};
