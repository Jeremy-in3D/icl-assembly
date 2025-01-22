export const getVideoSrc = (currentStep: any) => {
  if (currentStep.item === 4) {
    switch (currentStep.subItem) {
      case 0:
        return "3_compressed.mp4";
      case 1:
        return "4_compressed.mp4";
      case 2:
        return "5_compressed.mp4";
      case 3:
        return "6_compressed.mp4";
      case 4:
        return "7_compressed.mp4";
      case 5:
        return "8_compressed.mp4";
      case 6:
        return "9_compressed.mp4";
      default:
        return "1_compressed.mp4";
    }
  } else if (currentStep.item === 9) {
    switch (currentStep.subItem) {
      case 0:
        return "10_compressed.mp4";
      case 1:
        return "10_compressed.mp4";
      case 2:
        return "10_compressed.mp4";

      default:
        return "10_compressed.mp4";
    }
  } else {
    switch (currentStep.item) {
      case 0:
        return "drone_compressed.mp4";
      case 1:
        return "1_compressed.mp4";
      case 2:
        return "2_compressed.mp4";
      case 3:
        return "2_compressed.mp4";
      case 5:
        return "12_compressed.mp4";
      case 6:
        return "13_compressed.mp4";
      case 7:
        return "15_compressed.mp4";
      case 8:
        return "15_compressed.mp4";
      case 9:
        return "10_compressed.mp4";
      default:
        return "1_compressed.mp4";
    }
  }
};
