import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type VideoPlayerProps = {
  src: string;
  startTime: number;
  videoRef: React.MutableRefObject<any>;
  videoFit?: "contain";
  isQuestionaire?: boolean | undefined;
  question?: number;
  isOpeningVid?: boolean | undefined;
  setViewedOpeningVid?: React.Dispatch<React.SetStateAction<boolean>>;
  // height: any;
};

export const VideoPlayer = ({
  src = "/assets/video/Mesh Hololens - Remote Collaboration.mp4",
  startTime = 0,
  videoRef,
  videoFit,
  isQuestionaire,
  setViewedOpeningVid,
  isOpeningVid,
}: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = videoRef?.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        videoElement.currentTime = startTime;
        videoElement.play();
        setIsLoading(false);
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [startTime, videoRef]);

  return (
    <div className="video-container" style={{ position: "relative" }}>
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <video
        key={src}
        controls
        autoPlay
        preload="metadata"
        playsInline
        className={`video-player ${
          isQuestionaire ? "video-height smaller-vid" : ""
        } `}
        ref={videoRef}
        style={{
          height: "100%",
          objectFit: videoFit ? videoFit : "cover",
        }}
        onEnded={() =>
          setViewedOpeningVid && isOpeningVid ? setViewedOpeningVid(true) : null
        }
        onCanPlayThrough={() => setIsLoading(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
