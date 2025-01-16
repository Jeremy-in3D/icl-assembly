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

const surveyOption = 2;
const requiredTools = 2;
const MAX_NUM_OF_iTEMS = 9;
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
    <div ref={containerRef}>
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
  // const speechRate = 25; // Speech rate used in the utterance

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
    if ("speechSynthesis" in window) {
      if (utterance) {
        window.speechSynthesis.cancel();
        setNarrationText("");
        setUtterance(null);
        return;
      }
      console.log({ text });

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
    <div style={{ color: "white", background: "rgb(0,0,0,0.5)" }}>
      <div style={{ height: "9em" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2em",
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
          <span style={{ marginLeft: "0.5em" }}>
            {`${subSteps[currentStep.subItem]}`}.{" "}
          </span>
          <span style={{ marginLeft: "5px" }}>
            {data?.subItems[currentStep.subItem][currentStep.subItem].text}
          </span>
        </div>
        <div
          className="narration-icon-container"
          // style={{ border: utterance ? "2px solid green" : "" }}
        >
          {utterance ? (
            <VolumeOffIcon
              fontSize="medium"
              sx={{ color: "white" }}
              onClick={() => {
                handleSpeech(
                  data?.subItems[currentStep.subItem][currentStep.subItem]
                    .narration
                );
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
      <div className="item-vid-player-wrapper">
        {currentStep.item == requiredTools ? (
          <ImageToDisplay />
        ) : (
          <VideoPlayer
            isQuestionaire
            startTime={0}
            videoRef={videoRef}
            src={`/assets/video/${videoToPlay}`} //{"/assets/video/13_compressed.mp4"}
            // videoFit="contain"
            question={surveyOption}
          />
        )}
      </div>
      {/* {rate={speechRate}} */}
      {<Typewriter text={narrationText} currentStep={currentStep} />}

      <Counter
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        handleCounterClick={handleCounterClick}
        utterance={utterance}
        setUtterance={setUtterance}
      />
    </div>
  );
};

const Counter = ({ currentStep, handleCounterClick }: any) => {
  return (
    <>
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
            Prev Step
          </div>
          {/* Previous */}
        </button>
        <button
          className={`prev-next-btn ${
            currentStep == 10 ? "complete-btn-landscape" : ""
          }`}
          // style={currentStep == 10 ? { width: "6em", fontSize: "0.9em" } : {}}
          onClick={() => handleCounterClick(true)}
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
              Next Step <NavigateNextIcon fontSize="medium" />
            </div>
          )}
        </button>
      </div>
      <div style={{ height: "30px" }}></div>
    </>
  );
};

const ImageToDisplay = () => {
  return (
    <div>
      <img src="/assets/images/tools-gaskets.png" style={{ width: "100%" }} />
    </div>
  );
};
