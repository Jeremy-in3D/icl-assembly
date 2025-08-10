import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/appContext";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useTranslation } from "react-i18next";

const getAudioSrc = (currentStep: any) => {
  if (currentStep.item === 4) {
    switch (currentStep.subItem) {
      case 0:
        return "five-one";
      case 1:
        return "five-two";
      case 2:
        return "five-three";
      case 3:
        return "five-four";
      case 4:
        return "five-five";
      case 5:
        return "five-six";
      case 6:
        return "five-seven";
      default:
        return "five-eight";
    }
  } else if (currentStep.item === 9) {
    // switch (currentStep.subItem) {

    //   default:
    return "";
    // }
  } else {
    switch (currentStep.item) {
      case 0:
        return "one";
      case 1:
        return "two";
      case 2:
        return "three";
      case 3:
        return "four";
      case 5:
        return "six";
      case 6:
        return "seven";
      case 7:
        return "eight";
      case 8:
        return "";
      // case 9:
      //   return "10_compressed";
      default:
        return "one";
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

    setAudioSrc(
      `assets/audio/${language}/item-${srcToPlay}-${language}.mp3?v=${Date.now()}`
    );
    // language == "en"
    //   ? setAudioSrc(`assets/audio/en/item-${srcToPlay}.mp3?v=${Date.now()}`)
    //   : setAudioSrc(`assets/audio/zh/item-${srcToPlay}-zh.mp3?v=${Date.now()}`);
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
