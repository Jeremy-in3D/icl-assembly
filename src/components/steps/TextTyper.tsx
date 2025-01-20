// import { useEffect, useState } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

export const Typewriter = ({ currentStep }: any) => {
  // {rate}
  //   const [displayedText, setDisplayedText] = useState<any>("");
  //   const typingSpeed = 1000 / rate; // Calculate time per character based on the speech rate

  //   useEffect(() => {
  //     let index = 0;
  //     const timer = setInterval(() => {
  //       if (index < text.length) {
  //         setDisplayedText((prev: any) => prev + text[index]);
  //         index += 1;
  //       } else {
  //         clearInterval(timer);
  //       }
  //     }, typingSpeed);

  //     return () => clearInterval(timer); // Cleanup on unmount
  //   }, [text, typingSpeed]);

  const narrationText = getNarrationText(currentStep);
  // console.log({ narrationText });

  return (
    <div
      style={{
        color: "white",
        marginTop: "5px",
        fontFamily: "crimson-reg",
        background: "rgb(0,0,0,0.9)",
        padding: "10px",
        fontSize: "1.2em",
      }}
    >
      {<RecordVoiceOverIcon fontSize="small" />}
      {/* {text} */}
      <ul style={{ listStyle: "none" }}>
        {narrationText.length
          ? narrationText.map((narrationTxt: string, idx: number) => (
              <li key={`key-${idx}`}>{narrationTxt}</li>
            ))
          : null}
      </ul>
    </div>
  );
};

const getNarrationText = (currentStep: any) => {
  const subCategoryTexts = (subItemIdx: number) => {
    const subTexts: any = {
      0: [
        "The operator should climb on the Isotank carefully using the ladder",
      ],

      1: [
        "The operator should review the following:",
        "1. The GPS unit that is responsible for locating the Isotank unit globally.",
        "2. The dome's security pin.",
        "3. The safety pin.",
        "4. The lock pin.",
      ],
      2: [
        "1. Disconnect the security pin.",
        "2. Remove the safety pin.",
        "3. Remove the lock pin.",
        "4.Slowly and carefully open the dom.",
      ],
      3: [
        "Isotank's valves roles.",
        "Important!",
        "After emptying the Isotank, make sure that the valves are properly closed. Replace the gaskets for the blind flanges with the new ones provided.",
        "Make sure that all the bolts are tight. ",
      ],
      4: [
        "1. Make sure the pressure gauge shows 0.",
        "2. Make sure all valves are tightly closed.",
        "3. Open the blind flanges – open from the far side (far side screws).",
        "4. Make sure open gaskets are present.",
        "5. Switch the blind gaskets with open gaskets.",
      ],
      5: [
        "1. Connect the vent pipe to the red valve.",
        "2. Connect the liquid pipe to the yellow valve.",
        "3. Connect the Nitrogen/air entry pipe to the green valve.",
        "4. Cross-tighten the flange screws while observing the balance.",
      ],
      6: [
        "1. Before unloading, make sure the scrubber is fresh and active properly.",
        "2. The unloading will take place only by using Nitrogen/dry air.",
        "3. Make sure the red valve is closed (Vent).",
        "4. Open the yellow valve on the isotank (deep pipe) and afterwards the pipe valve.",
        "5. Open the green valve on the isotank (air/nitrogen) and afterwards the pipe valve in a monitored and gradual manner.",
        "6. Using Ammonia 3%, check for leaks. In case of a leak or if the valve connection is inadequate a white smoke will appear. In this case, valves must be closed and all connections are to be rechecked.",
      ],
    };
    return subTexts[subItemIdx] || [""];
  };

  const textByItem: any = {
    0: [
      "The purpose of the following video is to guide operators on how to properly operate the Bromine containing Isotank. Bromine (UN-1744) is a hazardous material therefore you will find labels and signs around the Isotank. The Isotanks are only intended to transport Bromine and are internally coated with lead. The Isotank frame exists to protect the tank during transport and operation.",
    ],
    1: [
      "The operator needs to register the Isotank serial number and the test date which are printed on the Isotank body",
    ],
    2: [
      "1. Aqueous ammonia at a concentration of 3% for checking leaks.",
      "2. Tools & gaskets.",
      "3. Spare blind gaskets.",
    ],
    3: [
      "The operator must protect himself using his personal protective equipment (or PPE) according to the safety information brochure: ",
      "1. Wear a protection suit.",
      "2. Wear neoprene gloves, make sure that the sleeve is on top of the glove.",
      "3. Wear a mask.",
      "4. Perform an impermeability test to the mask.",
      "5. Put on the head-dress and close the zipper of the suit.",
      "6. In case of a leak, close the green faucet immediately (air pressure/Nitrogen discharge).",
    ],
    4: subCategoryTexts(currentStep.subItem),
    5: [
      "1. Close the pipe green valve (air/nitrogen).",
      "2. Close the pipe yellow valve (deep pipe)",
      "3. Open the pipe red valve (vent).",
      "4. Open the red valve on the isotank (Vent).",
      "5. Check for leaks using Ammonia 3% through the red valve. In case of a leak, white smoke will appear and operator must close all valves and recheck connections.",
      "6. Wait for the pressure in the isotank to release.",
      "7. Close the green valve on the isotank.",
      "8. Close the yellow valve on the isotank.",
      "9. Wait until the pressure reduces to 0 in your system.",
      "10. Close the red valve on the isotanks and then the pipe's red valve.",
    ],
    6: [
      "1. Open the screws slowly and be careful, first open the screw on the far side and hold the pipes so they won't disconnect.",
      "2. Open the blind gaskets bag and install them on top of the valves.",
      "3. Install the blind flanges, cross-tighten the flange screws and keep them balanced.",
      "4. Check for leaks using Ammonia 3%. In case of a leak, white smoke will appear, and operator must close all valves and recheck connections.",
    ],
    7: [
      "1. Before closing the dome, double-check that all valves are closed and that the blind flanges are tightened.",
      "2. Close the dome.",
      "3. Connect the lock pin.",
      "4. Connect the safety pin.",
      "5. Install the security closure and register the number showing on the closure in the transport document.",
      "6. Carefully climb down using the ladder Isotank.",
      "7. Conduct a visual examination around the Isotank.",
      "8. End of process.",
    ],
    8: ["Safety Bromine Handbook"],
    9: ["Brom assigned safety gear"],
  };

  return textByItem[currentStep.item] || [""];
};
