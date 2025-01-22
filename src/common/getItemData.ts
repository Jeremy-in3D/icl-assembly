import { t } from "./t";

export const getItemsData = (itemIdx: number) => {
  const itemData: any = {
    0: {
      item: t("taskOne"),
      subItems: [
        { 0: { text: t("subTaskOne"), narration: t("subTaskOneNarration") } },
      ],
    },

    1: {
      item: t("taskTwo"),
      subItems: [
        { 0: { text: t("Checklist"), narration: t("subTaskTwoNarration") } },
      ],
    },

    2: {
      item: t("taskThree"),
      subItems: [
        {
          0: { text: t("subTaskThree"), narration: t("subTaskThreeNarration") },
        },
      ],
    },

    3: {
      item: t("taskFour"),
      subItems: [
        { 0: { text: t("subTaskFour"), narration: t("subTaskFourNarration") } },
      ],
    },

    4: {
      item: t("taskFive"),
      subItems: [
        {
          0: {
            text: t("subTaskFiveOne"),
            narration: t("subTaskFiveOneNarration"),
          },
        },
        {
          1: {
            text: t("subTaskFiveTwo"),
            narration: t("subTaskFiveTwoNarration"),
          },
        },
        {
          2: {
            text: t("subTaskFiveThree"),
            narration: t("subTaskFiveThreeNarration"),
          },
        },
        {
          3: {
            text: t("subTaskFiveFour"),
            narration: t("subTaskFiveFourNarration"),
          },
        },
        {
          4: {
            text: t("subTaskFiveFive"),
            narration: t("subTaskFiveFiveNarration"),
          },
        },
        {
          5: {
            text: t("subTaskFiveSix"),
            narration: t("subTaskFiveSixNarration"),
          },
        },
        {
          6: {
            text: t("subTaskFiveSeven"),
            narration: t("subTaskFiveSevenNarration"),
          },
        },
      ],
    },

    5: {
      item: t("taskSix"),
      subItems: [
        { 0: { text: t("taskSix"), narration: t("taskSixNarration") } },
      ],
    },
    6: {
      item: t("taskSeven"),
      subItems: [
        { 0: { text: t("taskSeven"), narration: t("taskSevenNarration") } },
      ],
    },
    7: {
      item: t("taskEight"),
      subItems: [
        { 0: { text: t("taskEight"), narration: t("taskEightNarration") } },
      ],
    },
    8: {
      item: t("taskNine"),
      subItems: [
        { 0: { text: t("subTaskNineOne"), narration: t("subTaskNine") } },
        {
          1: { text: t("subTaskNineTwo"), narration: t("subTaskTenNarration") },
        },
        {
          2: {
            text: t("subTaskNineThree"),
            narration: t("subTaskTenNarration"),
          },
        },
      ],
    },
    9: {
      item: t("taskTen"),
      subItems: [
        { 0: { text: t("subTaskTen"), narration: t("subTaskTenNarration") } },
      ],
    },
  };

  return itemData[itemIdx];
};
