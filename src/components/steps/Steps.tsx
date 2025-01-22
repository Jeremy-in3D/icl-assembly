import React, { useRef, useState, useEffect } from "react";
// import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { VideoPlayer } from "../VideoPlayer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { getItemsData } from "../../common/getItemData";
import { getVideoSrc } from "../../common/getVideoSrc";
import { Typewriter } from "./TextTyper";
import { useAppContext } from "../../context/appContext";

const surveyOption = 2;
const requiredTools = 2;
const MAX_NUM_OF_iTEMS = 9;
const stepWithNoNarration = 2;
const secondLastStep = 8;
const lastStep = 9;
// const TOTAL_ITEMS_IN_STEP_5 = 7;

type ItemProps = {
  currentStep: null | { item: number; subItem: number };
  setCurrentStep: React.Dispatch<React.SetStateAction<any>>;
};

function Item({ currentStep, setCurrentStep }: ItemProps) {
  if (!currentStep) {
    return null;
  }
  const containerRef: any = useRef();
  const videoRef = useRef(null);
  const currentItemData = getItemsData(currentStep.item);
  const numberOfSubItemsInCurrentItem = currentItemData?.subItems?.length;

  const videoToPlay = getVideoSrc(currentStep);
  // console.log({ videoToPlay });

  return (
    <div ref={containerRef} style={{ height: "100%" }}>
      <Text
        currentStep={currentStep}
        videoRef={videoRef}
        videoToPlay={videoToPlay}
        setCurrentStep={setCurrentStep}
        numberOfSubItemsInCurrentItem={numberOfSubItemsInCurrentItem}
        // containerRef={containerRef}
      />
    </div>
  );
}

export default Item;

const Text = ({
  currentStep,
  videoToPlay,
  videoRef,
  setCurrentStep,
  numberOfSubItemsInCurrentItem,
}: // containerRef,
any) => {
  const [voices, setVoices] = useState<any>([]);
  const [utterance, setUtterance] = useState<any>(null);
  const [narrationText, setNarrationText] = useState("");
  const [isShouldShowNarrationText, setIsShouldShowNarrationText] =
    useState<boolean>(true);
  // const speechRate = 25; // Speech rate used in the utterance

  const {
    setOpenPdf,
    // isNarrationMuted,
    setIsNarrationMuted,
    hasUserUnmutedNarrationOnce,
    setHasUserUnmutedNarrationOnce,
  } = useAppContext();

  useEffect(() => {
    const getVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      setVoices(voiceList);
    };

    getVoices();
    // Firefox does not support the voiceschanged event
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    }
  }, []);

  const handleSpeech = (text: any) => {
    if (
      currentStep.item == stepWithNoNarration ||
      currentStep.item == secondLastStep
    ) {
      return;
    }

    if ("speechSynthesis" in window) {
      if (utterance) {
        console.log("whattttt");
        window.speechSynthesis.cancel();
        setNarrationText("");
        setUtterance(null);
        return;
      }

      const newUtterance = new SpeechSynthesisUtterance(text);

      if (voices.length > 0) {
        const femaleVoice = voices.find(
          (voice: any) =>
            voice.name.includes("Zira") || // Zira Microsoft Asaf
            voice.name.includes("Samantha") || // Common female names in macOS/iOS
            (voice.name.includes("Google") && voice.name.includes("Female")) // common on Android
        );

        newUtterance.voice = femaleVoice || voices[0];
      }

      newUtterance.rate = 0.8;
      setNarrationText(text);
      window.speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance);

      newUtterance.onend = () => setUtterance(null);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  useEffect(() => {
    if (currentStep && currentStep.item !== stepWithNoNarration) {
      if (currentStep.item == secondLastStep) {
        return;
      }
      const textToSpeak =
        data?.subItems[currentStep.subItem][currentStep.subItem].narration;

      if (textToSpeak && !utterance) {
        const timer = setTimeout(() => {
          setIsShouldShowNarrationText(true);
          if (hasUserUnmutedNarrationOnce) {
            handleSpeech(textToSpeak);
          }
        }, 1200);

        // Cleanup the timer if the component unmounts or if currentStep changes again
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [currentStep]);

  if (!currentStep) {
    return null;
  }

  const data = getItemsData(currentStep.item);

  const subSteps: any = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
  };

  const handleCounterClick = (nextStepBtnClicked: any) => {
    setIsShouldShowNarrationText(false);
    if (utterance) {
      window.speechSynthesis.cancel();
      setNarrationText("");
      setUtterance(null);
    }
    if (numberOfSubItemsInCurrentItem === undefined) {
      return null;
    }
    // if (containerRef.current) {
    //   console.log("JAJAJAHA");
    //   const newScrollTop = 0; // containerRef.current.scrollHeight * 0.1; // Calculating 10% down from the top
    //   containerRef.current.scrollTo({
    //     top: newScrollTop,
    //     behavior: "smooth", // Adds a smooth scrolling effect
    //   });
    //   window.scrollTo({
    //     top: newScrollTop,
    //     behavior: "smooth", // Adds a smooth scrolling effect
    //   });
    // }

    if (nextStepBtnClicked) {
      // NEXT BTN
      const currentStepCopy = { ...currentStep };
      const lastSubItemIdx = numberOfSubItemsInCurrentItem - 1;
      if (currentStep.subItem == lastSubItemIdx) {
        if (currentStep.item == MAX_NUM_OF_iTEMS) {
          setCurrentStep(null);
          return;
        }
        const newStep = { item: currentStepCopy.item + 1, subItem: 0 };

        setCurrentStep(newStep);
      } else {
        const newStep = {
          item: currentStepCopy.item,
          subItem: currentStepCopy.subItem + 1,
        };
        setCurrentStep(newStep);
      }
    } else {
      // PREVIOUS BTN
      const currentStepCopy = { ...currentStep };
      const firstSubItemIdx = 0;

      if (currentStep.item != 0 && currentStep.subItem > firstSubItemIdx) {
        const newStep = {
          item: currentStepCopy.item,
          subItem: currentStepCopy.subItem - 1,
        };
        setCurrentStep(newStep);
      } else if (
        currentStep.item != 0 &&
        currentStep.subItem == firstSubItemIdx
      ) {
        if (currentStep.item == 5) {
          const newStep = {
            item: currentStepCopy.item - 1,
            subItem: 6,
          };
          setCurrentStep(newStep);
        } else {
          const newStep = {
            item: currentStepCopy.item - 1,
            subItem: 0,
          };
          setCurrentStep(newStep);
        }
      } else if (currentStep.item == 0) {
        return null;
      }
    }
    setNarrationText("");
  };

  return (
    <div
      style={{ color: "white", background: "rgb(0,0,0,0.5)", height: "100%" }}
    >
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: "1em",
            padding: "3px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h2 className="item-opened-title">
            <span
              style={{ marginLeft: "0.3em", borderBottom: "1px solid white" }}
            >
              {data?.item}
            </span>
          </h2>
        </div>
      </div>
      <div className="item-text-subItem-wrapper">
        <div className="item-text-subItem-text">
          <div style={{ marginLeft: "0.5em" }}>
            {`${subSteps[currentStep.subItem]}`}.{" "}
          </div>
          <div style={{ marginLeft: "8px", fontSize: "1.1em" }}>
            {data?.subItems[currentStep.subItem][currentStep.subItem].text}
          </div>
        </div>
        <div
          className={`narration-icon-container ${
            !hasUserUnmutedNarrationOnce ? "narration-icon-container-ani" : ""
          }`}
          style={{ border: utterance ? "1px solid green" : "" }}
        >
          {!utterance ? (
            <VolumeOffIcon
              fontSize="medium"
              sx={{
                color: "white",
                // border: "2px solid transparent", // Initial border setup
                // animation: "border-flash 1.4s infinite",
                // "@keyframes border-flash": {
                //   "0%": { borderColor: "green" },
                //   "50%": { borderColor: "transparent" },
                //   "100%": { borderColor: "green" },
                // },
              }}
              onClick={() => {
                if (!hasUserUnmutedNarrationOnce) {
                  console.log("HASHADHASHD");
                  setHasUserUnmutedNarrationOnce(true);
                }
                handleSpeech(
                  data?.subItems[currentStep.subItem][currentStep.subItem]
                    .narration
                );
                setIsNarrationMuted(false);
              }}
            />
          ) : (
            <VolumeUpIcon
              fontSize="medium"
              sx={{ color: "white" }}
              onClick={() => {
                handleSpeech(
                  data?.subItems[currentStep.subItem][currentStep.subItem]
                    .narration
                );
                setIsNarrationMuted(true);
              }}
            />
          )}
          {/* <RecordVoiceOverIcon
            fontSize="medium"
            sx={{ color: "white" }}
            onClick={() => {
              handleSpeech(
                data?.subItems[currentStep.subItem][currentStep.subItem]
                  .narration
              );
            }}
          /> */}
        </div>
      </div>
      {currentStep.item == secondLastStep ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className="menu-start-btn"
            style={{
              width: "50%",
              textDecoration: "underline",
              marginTop: "2em",
              marginLeft: "2em",
            }}
            onClick={() => setOpenPdf(true)}
          >
            Open Handbook
          </button>
        </div>
      ) : null}
      <div className="item-vid-player-wrapper">
        {currentStep.item == requiredTools || currentStep.item == lastStep ? (
          <ImageToDisplay currentStep={currentStep} />
        ) : (
          <VideoPlayer
            isQuestionaire
            startTime={0}
            videoRef={videoRef}
            src={
              currentStep.item == secondLastStep
                ? "https://in3dwebsite.blob.core.windows.net/video/ICL bromine safety (1).mp4"
                : `/assets/video/${videoToPlay}`
            } //{"/assets/video/13_compressed.mp4"}
            // videoFit="contain"
            question={surveyOption}
          />
        )}
      </div>
      {/* {rate={speechRate}} */}
      <Counter
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        handleCounterClick={handleCounterClick}
        utterance={utterance}
        setUtterance={setUtterance}
      />
      {isShouldShowNarrationText ? (
        <Typewriter text={narrationText} currentStep={currentStep} />
      ) : null}
      <div
        style={{
          height: "50px",
          background: "rgb(0,0,0,0.5)",
        }}
      ></div>
    </div>
  );
};

const Counter = ({ currentStep, handleCounterClick }: any) => {
  const getBtnText = (isPrevBtn: boolean) => {
    if (currentStep.item == 4) {
      if (isPrevBtn && currentStep.subItem == 0) {
        return "Item";
      }
      if (!isPrevBtn && currentStep.subItem == 6) {
        return "Item";
      }
      return "Step";
    } else {
      return "Item";
    }
  };

  return (
    <div style={{ background: "rgb(0,0,0,0.5)", margin: 0 }}>
      <div className="prev-next-survey-wrapper">
        <button
          onClick={() => handleCounterClick(false)}
          style={{
            opacity: currentStep.item == 0 ? 0.6 : 1,
            border: currentStep.item == 0 ? "1px solid grey" : "",
          }}
          className="prev-next-btn"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              alignItems: "center",
              marginRight: "5px",
            }}
          >
            <NavigateBeforeIcon fontSize="medium" />
            {`Prev ${getBtnText(true)}`}
          </div>
          {/* Previous */}
        </button>
        <button
          className={`prev-next-btn ${
            currentStep == 10 ? "complete-btn-landscape" : ""
          }`}
          // style={currentStep == 10 ? { width: "6em", fontSize: "0.9em" } : {}}
          onClick={() => handleCounterClick(true)}
          style={{ padding: currentStep.item == 9 ? "12px" : "" }}
        >
          {/* Next */}
          {currentStep.item == 9 ? (
            "Complete"
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              {`Next ${getBtnText(false)}`}{" "}
              <NavigateNextIcon fontSize="medium" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const ImageToDisplay = ({ currentStep }: any) => {
  return (
    <div>
      <img
        src={`/assets/images/${
          currentStep.item == 9 ? "gear.png" : "tools-gaskets.jpg"
        } `}
        style={{ width: "100%" }}
      />
    </div>
  );
};
