import { useEffect } from "react";

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
}: // question,

VideoPlayerProps) => {
  // const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef?.current;
    if (videoElement) {
      // Set start time (when video metadata loaded)
      const handleLoadedMetadata = () => {
        videoElement.currentTime = startTime;
        videoElement.play();
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
    <div className="video-container">
      <video
        controls
        autoPlay
        playsInline
        className={`video-player ${
          isQuestionaire ? "video-height smaller-vid" : ""
        } `}
        // className={`video-player ${isQuestionaire ? "video-height" : ""} ${
        //   question == 6 || question == 8 ? "smaller-vid" : ""
        // }`}
        ref={videoRef}
        style={{
          // height: height ? height : "100%",
          height: "100%",
          objectFit: videoFit ? videoFit : "cover", // "containe"
        }}
        onEnded={() =>
          setViewedOpeningVid && isOpeningVid ? setViewedOpeningVid(true) : null
        }
      >
        <source
          // src={process.env.PUBLIC_URL + "/path-to-your-video.mp4"}
          src={src}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
