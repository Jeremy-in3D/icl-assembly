// Define the type for the props of the preload function
interface PreloadConfig {
  setVideosPreloaded: React.Dispatch<React.SetStateAction<boolean>>;
  batchSize?: number;
  videosPreloaded: boolean;
}

export const preloadVideos = ({
  setVideosPreloaded,
  batchSize = 1,
  videosPreloaded,
}: PreloadConfig): void => {
  if (videosPreloaded) {
    return;
  }
  const videoSources = [
    "https://in3dwebsite.blob.core.windows.net/video/ICL bromine safety (1).mp4",
    // Add other video sources if needed
  ];

  const loadVideo = (src: string): Promise<HTMLVideoElement> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "metadata";

      video.oncanplay = () => resolve(video);
      video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
    });
  };

  const preloadBatch = async (batch: string[]): Promise<HTMLVideoElement[]> => {
    return Promise.all(batch.map((src) => loadVideo(src)));
  };

  const staggeredPreload = async (
    sources: string[],
    batchSize: number
  ): Promise<void> => {
    let index = 0;
    while (index < sources.length) {
      const batch = sources.slice(index, index + batchSize);
      await preloadBatch(batch);
      index += batchSize;
    }
    setVideosPreloaded(true);
  };

  staggeredPreload(videoSources, batchSize).catch((error) =>
    console.error("Error preloading videos:", error)
  );
};
