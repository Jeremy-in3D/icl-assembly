import React, { useRef } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { VideoPlayer } from "../VideoPlayer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { getItemsData } from "../../common/getItemData";

const surveyOption = 2;
const MAX_NUM_OF_iTEMS = 10;

type ItemProps = {
  currentStep: null | { item: number; subItem: number };
  setCurrentStep: React.Dispatch<React.SetStateAction<any>>;
};

function Item({ currentStep, setCurrentStep }: any) {
  console.log("least this");
  const videoRef = useRef(null);
  // const handleCounterClick = (counterBtnClicked: any) => {
  //   if (counterBtnClicked) {
  //     const currentStepCopy = { ...currentStep };
  //     const lastSubItemIdx = null;
  //   }
  // };
  return (
    <div>
      <div>
        <Text currentStep={currentStep} />
      </div>
      <div>
        <VideoPlayer
          isQuestionaire
          startTime={0}
          videoRef={videoRef}
          src={"/assets/video/13_compressed.mp4"}
          // videoFit="contain"
          question={surveyOption}
        />
      </div>

      <Counter setCurrentStep={setCurrentStep} currentStep={currentStep} />
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
  // console.log({ data });
  // console.log({ currentStep });
  // console.log(data.subItems[currentStep.subItem][currentStep.subItem].text);

  return (
    <div style={{ color: "white" }}>
      <div style={{ textAlign: "center" }}>
        <h2>{data.item}</h2>
      </div>
      <div className="item-text-subItem-wrapper">
        {/* {data.subItems.map((subItem: any, idx: number) => (
          <div key={`subItem-${idx}`}>{subItem[currentStep.subItem]}</div>
        ))} */}
        <div>
          {data.subItems[currentStep.subItem][currentStep.subItem].text}
        </div>
        <div className="narration-icon-container">
          <RecordVoiceOverIcon fontSize="large" sx={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
};

const Counter = ({ currentStep, setCurrentStep, openModal }: any) => {
  console.log({ currentStep });
  const itemData = getItemsData(currentStep.item);
  const numberOfSubItems = itemData.subItems.length;
  console.log({ numberOfSubItems });
  return (
    <div className="prev-next-survey-wrapper">
      <button
        onClick={() =>
          currentStep > 1 ? setCurrentStep(currentStep - 1) : null
        }
        style={{ opacity: currentStep == 1 ? 0.4 : 1 }}
        className="prev-next-btn"
      >
        Prev Step <NavigateBeforeIcon fontSize="large" />
        {/* Previous */}
      </button>
      <button
        className={`prev-next-btn ${
          currentStep == 10 ? "complete-btn-landscape" : ""
        }`}
        // style={currentStep == 10 ? { width: "6em", fontSize: "0.9em" } : {}}
        onClick={
          currentStep == MAX_NUM_OF_iTEMS
            ? () => openModal()
            : () => {
                currentStep < MAX_NUM_OF_iTEMS
                  ? setCurrentStep(currentStep + 1)
                  : null;
              }
        }
      >
        {/* Next */}
        {currentStep == 10 ? (
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
