import { useEffect } from "react";

type VideoPlayerProps = {
  src: string;
  startTime: number;
  videoRef: React.MutableRefObject<any>;
  videoFit?: "contain";
  height: any;
};

export const VideoPlayer = ({
  src = "/assets/video/Mesh Hololens - Remote Collaboration.mp4",
  startTime = 0,
  videoRef,
  videoFit,
}: // height,
VideoPlayerProps) => {
  // const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef?.current;
    if (videoElement) {
      console.log("dont think we ever got in here");
      // Set the start time when the video metadata is loaded
      const handleLoadedMetadata = () => {
        videoElement.currentTime = startTime;
        videoElement.play();
      };

      // Add event listener
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      // Cleanup event listener
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [startTime, videoRef]);

  return (
    <div className="video-container" style={{ width: "100%", height: "100%" }}>
      <video
        controls
        autoPlay
        playsInline
        className="video-player"
        ref={videoRef}
        style={{
          width: "100%",
          // height: height ? height : null,
          height: "100%",
          objectFit: videoFit ? videoFit : "cover", // "containe"
        }}
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
