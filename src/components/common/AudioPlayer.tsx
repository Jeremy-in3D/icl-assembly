import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/appContext";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useTranslation } from "react-i18next";

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
  const [audioSrc, setAudioSrc] = useState("");

  const { i18n } = useTranslation();

  const language = i18n.language || "en";

  const {
    isPlayingAudio,
    setIsPlayingAudio,
    hasUserUnmutedNarrationOnce,
    setHasUserUnmutedNarrationOnce,
  } = useAppContext();

  useEffect(() => {
    const srcToPlay = getAudioSrc(currentStep);
    // setAudioSrc(`assets/audio/item-${srcToPlay}`);
    language == "en"
      ? setAudioSrc(`assets/audio/en/item-${srcToPlay}?v=${Date.now()}`)
      : setAudioSrc(`assets/audio/zh/item-${srcToPlay}-zh?v=${Date.now()}`);
  }, [currentStep]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
    }

    if (isPlayingAudio) {
      setTimeout(() => handlePlay(), 800);
    } else {
      // handlePlay();
    }
  }, [audioSrc]);

  const handlePlay = () => {
    if (!hasUserUnmutedNarrationOnce) {
      setHasUserUnmutedNarrationOnce(true);
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <audio ref={audioRef}>
        <source src={audioSrc ? audioSrc : ""} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {/* <button onClick={isPlayingAudio ? handlePause : handlePlay}>
        {isPlayingAudio ? "Pause" : "Play"}
      </button> */}
      {!isPlayingAudio ? (
        <VolumeOffIcon
          fontSize="medium"
          sx={{
            color: "white",
          }}
          onClick={() => {
            handlePlay();
          }}
        />
      ) : (
        <VolumeUpIcon
          fontSize="medium"
          sx={{ color: "white" }}
          onClick={() => {
            handlePause();
          }}
        />
      )}
    </div>
  );
};
