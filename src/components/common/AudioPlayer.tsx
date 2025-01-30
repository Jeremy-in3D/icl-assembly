import { MutableRefObject, useRef, useState } from "react";

export const AudioPlayer = () => {
  const audioRef: MutableRefObject<any> = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <audio ref={audioRef}>
        <source src="/assets/audio/item-one.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};
