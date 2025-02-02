import { MutableRefObject, useRef, useState } from "react";

const getAudioSrc = (currentStep: any) => {
  if (currentStep.item === 4) {
    switch (currentStep.subItem) {
      case 0:
        return "five-one.mp3";
      case 1:
        return "five-two.mp3";
      case 2:
        return "five-three.mp3";
      case 3:
        return "five-four.mp3";
      case 4:
        return "five-five.mp3";
      case 5:
        return "five-six.mp3";
      case 6:
        return "five-seven.mp3";
      default:
        return "five-eight.mp3";
    }
  } else if (currentStep.item === 9) {
    // switch (currentStep.subItem) {

    //   default:
    return "";
    // }
  } else {
    switch (currentStep.item) {
      case 0:
        return "one.mp3";
      case 1:
        return "two.mp3";
      case 2:
        return "three.mp3";
      case 3:
        return "four.mp3";
      case 5:
        return "six.mp3";
      case 6:
        return "seven.mp3";
      case 7:
        return "eight.mp3";
      case 8:
        return "";
      // case 9:
      //   return "10_compressed.mp3";
      default:
        return "one.mp3";
    }
  }
};

export const AudioPlayer = ({ currentStep }: any) => {
  const audioRef: MutableRefObject<any> = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const srcToPlay = getAudioSrc(currentStep);

  console.log({ srcToPlay });

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
        <source
          src={srcToPlay ? `assets/audio/${srcToPlay}` : ""}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
      <button onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};
