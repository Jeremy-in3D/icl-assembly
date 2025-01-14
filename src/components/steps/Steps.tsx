import React, { useRef } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { VideoPlayer } from "../VideoPlayer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { getItemsData } from "../../common/getItemData";
import { getVideoSrc } from "../../common/getVideoSrc";

const surveyOption = 2;
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
  const videoRef = useRef(null);
  const currentItemData = getItemsData(currentStep.item);
  const numberOfSubItemsInCurrentItem = currentItemData?.subItems?.length;

  const handleCounterClick = (nextStepBtnClicked: any) => {
    if (numberOfSubItemsInCurrentItem === undefined) {
      return null;
    }
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
  };

  const videoToPlay = getVideoSrc(currentStep);
  console.log({ videoToPlay });

  return (
    <div>
      <div>
        <Text currentStep={currentStep} />
      </div>
      <div className="item-vid-player-wrapper">
        <VideoPlayer
          isQuestionaire
          startTime={0}
          videoRef={videoRef}
          src={`/assets/video/${videoToPlay}`} //{"/assets/video/13_compressed.mp4"}
          // videoFit="contain"
          question={surveyOption}
        />
      </div>

      <Counter
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        handleCounterClick={handleCounterClick}
      />
    </div>
  );
}

export default Item;

type TextProps = Pick<ItemProps, "currentStep">;

const Text = ({ currentStep }: TextProps) => {
  if (!currentStep) {
    console.log("why in here");
    return null;
  }
  const data = getItemsData(currentStep.item);

  const handleSpeech = (text: string) => {
    console.log({ text });
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          height: "9em",
        }}
      >
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
            {`${currentStep.item + 1}. `} {data?.item}
          </h2>
        </div>
      </div>
      <div className="item-text-subItem-wrapper">
        <div className="item-text-subItem-text">
          {`${currentStep.subItem + 1}`}.{" "}
          <span style={{ marginLeft: "5px" }}>
            {data?.subItems[currentStep.subItem][currentStep.subItem].text}
          </span>
        </div>
        <div className="narration-icon-container">
          <RecordVoiceOverIcon
            fontSize="medium"
            sx={{ color: "white" }}
            onClick={() => {
              console.log("jabadui");
              handleSpeech(
                data?.subItems[currentStep.subItem][currentStep.subItem]
                  .narration
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Counter = ({ currentStep, handleCounterClick }: any) => {
  return (
    <div className="prev-next-survey-wrapper">
      <button
        onClick={() => handleCounterClick(false)}
        style={{ opacity: currentStep.item == 0 ? 0.6 : 1 }}
        className="prev-next-btn"
      >
        <NavigateBeforeIcon fontSize="large" /> Prev Step
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
          <>
            Next Step <NavigateNextIcon fontSize="large" />
          </>
        )}
      </button>
    </div>
  );
};
