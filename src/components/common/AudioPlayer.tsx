import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/appContext";

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
  const audioRef: any = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState("");

  const { isPlayingAudio, setIsPlayingAudio } = useAppContext();

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //   }
  //   const srcToPlay = getAudioSrc(currentStep);
  //   setAudioSrc(`assets/audio/item-${srcToPlay}`);
  //   console.log(`Playing audio from: assets/audio/item-${srcToPlay}`);
  // }, [currentStep]);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.pause(); // Pause current playback
  //     const srcToPlay = getAudioSrc(currentStep);
  //     setAudioSrc(`assets/audio/item-${srcToPlay}`);
  //     audioRef.current.load(); // Load the new audio source
  //   }
  // }, [currentStep]);

  useEffect(() => {
    const srcToPlay = getAudioSrc(currentStep);
    // setAudioSrc(`assets/audio/item-${srcToPlay}`);
    setAudioSrc(`assets/audio/item-${srcToPlay}?v=${Date.now()}`);
  }, [currentStep]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };

  // console.log(`assets/audio/item-${audioSrc}`);

  return (
    <div>
      <audio ref={audioRef}>
        <source src={audioSrc ? audioSrc : ""} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={isPlayingAudio ? handlePause : handlePlay}>
        {isPlayingAudio ? "Pause" : "Play"}
      </button>
    </div>
  );
};
