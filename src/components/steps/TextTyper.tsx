// import { useEffect, useState } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@mui/icons-material/Phone";

const getNarrationTextByLanguage = (language: string, currentStep: any) => {
  if (language == "zh") {
    return getNarrationTextZh(currentStep);
  } else if (language == "kr") {
    return getNarrationTextKr(currentStep);
  } else if (language == "en") {
    return getNarrationText(currentStep);
  }

  return getNarrationText(currentStep);
};

export const Typewriter = ({ currentStep, isRegularStep }: any) => {
  if (currentStep.item == 8 && currentStep.subItem == 1 && isRegularStep) {
    return null;
  }
  const { i18n } = useTranslation();
  const language = i18n.language || "en";
  const narrationText = getNarrationTextByLanguage(language, currentStep);
  // i18n.language == "en"
  //   ? getNarrationText(currentStep)
  //   : getNarrationTextZh(currentStep);

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
              <li
                style={
                  currentStep.item == 8 &&
                  currentStep.subItem == 1 &&
                  idx % 2 != 0
                    ? { marginLeft: "1em" }
                    : {}
                }
                key={`key-${idx}`}
              >
                {narrationTxt}
              </li>
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
        "4.Slowly and carefully open the dome.",
      ],
      // 3: [
      //   "Isotank's valves roles.",
      //   "Important!",
      //   "After emptying the Isotank, make sure that the valves are properly closed. Replace the gaskets for the blind flanges with the new ones provided.",
      //   "Make sure that all the bolts are tight. ",
      // ],
      3: [
        "Isotank's valves roles:",
        "Yellow Valve: Dip Pipe.",
        "Red Valve: Pressure Relief (vent).",
        "Green Valve: Nitrogen Inlet.",
      ],
      4: [
        "1. Make sure all valves are tightly closed.",
        "2.  Make sure the pressure gauge shows 0.",
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
        "7. At any stage of unloading: in case of a leak, close the green valve immediately (air pressure/Nitrogen discharge) and then the yellow valve.",
      ],
    };

    const lastItemSubTexts: any = {
      0: [],
      1: [
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            EUROPE
          </span>
          : ICL-IP TERNEUZEN HOLLAND
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (31) 11-568-9000
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            U.K.
          </span>
          : FOR EMERGENCY ADVICE
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (44) 1865-407-333
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            U.S.A.
          </span>
          : CHEMTREC
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: 1-800-424-9300
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            SGS Korea
          </span>
          : <span></span>
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: +82 51 630 7043 / 7061
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            SINGAPORE
          </span>
          : ALERT - SGS
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (65) 6542-9595
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            CHINA
          </span>
          : NRCC
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (86) 532-8388-9090
        </div>,
      ],
      2: [
        "Personal protective equipment: ",
        <br />,
        "1. Respiratory protection: Self-contained breathing apparatus.",
        "An approved combination acid gas-organic vapor gas mask is suitable for short term exposure to low concentration or escape purposes only.",
        "NIOSH recommendations for respirator selection includes any chemical cartridge respirator with a full facepiece and cartridge. Only nonoxidizable sorbents are allowed",
        "2. Hand protection: PVC or neoprene gloves.",
        "3. Eye protection: Chemical safety goggles or face shield with safety glasses.",
        "4. Skin and body protection: Protective impervious clothing, hard hat and neoprene or rubber boots.",
      ],
    };

    return currentStep.item == 8
      ? lastItemSubTexts[subItemIdx]
      : subTexts[subItemIdx];
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
    8: subCategoryTexts(currentStep.subItem),
  };

  return textByItem[currentStep.item] || [""];
};

const getNarrationTextZh = (currentStep: any) => {
  const subCategoryTexts = (subItemIdx: number) => {
    const subTexts: any = {
      0: ["操作员应小心地使用梯子爬上Isotank"],

      1: [
        "操作员应审查以下内容。",
        "一、负责全球定位Isotank装置的GPS装置。",
        "二、圆顶铅封。",
        "三、安全锁杆插销。",
        "四、锁杆。",
      ],
      2: [
        "一、剪断铅封。",
        "二、拔下安全插销。",
        "三、抽出锁杆。",
        "四、缓慢而小心地打开圆顶。",
      ],
      // 3: [
      //   "Isotank's valves roles.",
      //   "Important!",
      //   "After emptying the Isotank, make sure that the valves are properly closed. Replace the gaskets for the blind flanges with the new ones provided.",
      //   "Make sure that all the bolts are tight. ",
      // ],
      3: [
        "Isotank阀门的作用。",
        "黄色阀门，浸管。",
        "红阀公司，泄压（排气）。",
        "绿色阀门，氮气入口。",
      ],
      4: [
        "一、确保所有阀门都紧紧关闭。",
        "二、确保压力表显示为零。",
        "三、打开盲板法兰——从远侧打开（远侧螺钉）",
        "四、确保存在打开的垫片。",
        "五、用打开的垫片更换盲板垫片",
      ],
      5: [
        "一、将排气管连接到红色阀门上。",
        "二、将液体管连接到黄色阀门。",
        "三、将氮气/空气入口管连接到绿色阀门。",
        "四、交叉拧紧法兰螺钉，同时观察平衡情况",
      ],
      6: [
        "一、卸载前，确保洗涤器洁净且正常工作。",
        "二、只能使用氮气/干燥空气进行卸载。",
        "三、确保红色阀门关闭（排气）。",
        "四、打开Isotank（深管）上的黄色阀门，然后打开管道阀门。",
        "五、打开Isotank上的绿色阀门（空气/氮气），然后以监测和渐进的方式打开管道阀门。",
        "六、使用3%的氨水，检查是否泄漏。一旦泄漏或阀门连接不足，将出现白烟。在这种情况下，必须关闭阀门，并重新检查所有连接。",
        "七、在卸载的任何阶段：如果发生泄漏，请立即关闭绿色阀门（气压/氮气排放），然后关闭黄色阀门。",
      ],
    };

    const lastItemSubTexts: any = {
      0: [],
      1: [
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            EUROPE
          </span>
          : <span>ICL-IP TERNEUZEN HOLLAND</span>
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (31) 11-568-9000
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            U.K.
          </span>
          : FOR EMERGENCY ADVICE
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (44) 1865-407-333
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            U.S.A.
          </span>
          : CHEMTREC
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: 1-800-424-9300
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            SGS Korea
          </span>
          : <span></span>
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: +82 51 630 7043 / 7061
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            SINGAPORE
          </span>
          : ALERT - SGS
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (65) 6542-9595
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            CHINA
          </span>
          : NRCC
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (86) 532-8388-9090
        </div>,
      ],
      2: [
        "个人保护装备",
        <br />,
        "1.呼吸防护：自给式呼吸器",
        "经批准的酸性气体-有机蒸气组合防毒面具仅适用于短期低浓度暴露或逃生目的",
        "NIOSH对呼吸器选择的建议包括任何带有全面罩和滤筒的化学滤筒呼吸器。只允许使用不可氧化的吸附剂",
        "2.手部防护：PVC或氯丁橡胶手套",
        "3.眼睛防护：化学安全护目镜或带安全眼镜的面罩",
        "4.皮肤和身体防护：防水的衣服、安全帽和氯丁橡胶或橡胶靴",
      ],
    };

    return currentStep.item == 8
      ? lastItemSubTexts[subItemIdx]
      : subTexts[subItemIdx];
  };

  const textByItem: any = {
    0: [
      "以下视频的目的是指导操作员如何正确操作含溴Isotank。溴（UN-1744）是一种危险物质，因此您可以在Isotank周围找到标签和标志。Isotank仅用于运输溴，内部涂有铅。Isotank框架的存在是为了在运输和操作过程中保护储罐。",
    ],
    1: ["操作员需要注册打印在Isotank主体上的Isotank序列号和测试日期。"],
    2: [
      "一、浓度为3%的氨水，用于检查泄漏。",
      "二、工具和垫片。",
      "三、备用盲板垫片。",
    ],
    3: [
      "操作员必须根据安全信息手册使用个人防护装备（或PPE）保护自己。",
      "一、穿防护服。",
      "二、戴氯丁橡胶手套，确保袖子在手套上。",
      "三、戴上口罩。",
      "四、对面罩进行不渗透性测试。",
      "五、穿上头盔，拉上衣服拉链。",
    ],
    4: subCategoryTexts(currentStep.subItem),
    5: [
      "一、关闭管道绿色阀（空气/氮气）。",
      "二、关闭管道黄色阀（深管）。",
      "三、打开管道红色阀门（排气口）。",
      "四、打开Isotank上的红色阀门（排气口）。",
      "五、使用3%的氨水通过红色阀门检查是否泄漏。如果发生泄漏，将出现白烟，操作员必须关闭所有阀门并重新检查连接。",
      "六、等待Isotank中的压力释放。",
      "七、关闭Isotank上的绿色阀门。",
      "八、关闭Isotank上的黄色阀门。",
      "九、等待系统中的压力降至0。",
      "十、关闭Isotank上的红色阀门，然后关闭管道的红色阀门。",
    ],
    6: [
      "一、慢慢且小心地打开螺栓，首先打开远端的螺栓，握住管道，这样它们就不会断开。",
      "二、打开密封垫盲袋，将其安装在阀门顶部。",
      "三、安装盲板法兰，交叉拧紧法兰螺钉并保持平衡。",
      "四、使用3%的氨水检查是否泄漏。一旦发生泄漏，将出现白烟，操作员必须关闭所有阀门并重新检查连接。",
    ],
    7: [
      "一、关闭圆顶前，请仔细检查所有阀门是否关闭，盲板法兰是否拧紧。",
      "二、关闭圆顶。",
      "三、插上锁杆。",
      "四、插上安全插销。",
      "五、安装安全封盖，并在运输文件中登记封盖上的编号。",
      "六、使用Isotank梯子小心地爬下来。",
      "七、在Isotank周围进行目视检查",
      "八、完成。",
    ],
    8: subCategoryTexts(currentStep.subItem),
  };

  return textByItem[currentStep.item] || [""];
};

const getNarrationTextKr = (currentStep: any) => {
  const subCategoryTexts = (subItemIdx: number) => {
    const subTexts: any = {
      0: ["작업자는 사다리를 사용하여 Isotank에 조심스럽게 올라가야 합니다."],

      1: [
        "작업자는 다음 사항을 점검해야 합니다:",
        "1. Isotank 유닛의 전 세계 위치를 추적하는 GPS 유닛.",
        "2. 돔의 보안 핀.",
        "3. 안전 핀.",
        "4. 잠금 핀.",
      ],
      2: [
        "1. 보안 핀을 분리합니다.",
        "2. 안전 핀을 제거합니다.",
        "3. 잠금 핀을 제거합니다.",
        "4. 돔을 천천히 조심스럽게 엽니다.",
      ],
      // 3: [
      //   "Isotank's valves roles.",
      //   "Important!",
      //   "After emptying the Isotank, make sure that the valves are properly closed. Replace the gaskets for the blind flanges with the new ones provided.",
      //   "Make sure that all the bolts are tight. ",
      // ],
      3: [
        "Isotank의 밸브 역할은 다음과 같습니다:",
        "노란색 밸브: 딥 파이프.",
        "빨간색 밸브: 압력 해제(배기).",
        "녹색 밸브: 질소 주입구.",
      ],
      4: [
        "1. 모든 밸브가 단단히 닫혀 있는지 확인합니다.",
        "2. 압력 게이지가 0을 가리키는지 확인합니다.",
        "3. 블라인드 플랜지를 엽니다 – 먼 쪽(먼 쪽 나사)부터 엽니다.",
        "4. 개방형 가스켓이 있는지 확인합니다.",
        "5. 블라인드 가스켓을 개방형 가스켓으로 교체합니다.",
      ],
      5: [
        "1. 배기 파이프를 빨간색 밸브에 연결합니다.",
        "2. 액체 파이프를 노란색 밸브에 연결합니다.",
        "3. 질소/공기 주입 파이프를 녹색 밸브에 연결합니다.",
        "4. 균형을 유지하면서 플랜지 나사를 교차로 조입니다.",
      ],
      6: [
        "1. 추출 전에 스크러버가 준비되어 있고 제대로 작동하는지 확인합니다.",
        "2. 추출은 질소/건조 공기를 사용하여만 수행됩니다.",
        "3. 빨간색 밸브(배기)가 닫혀 있는지 확인합니다.",
        "4. Isotank의 노란색 밸브(딥 파이프)를 열고 그 후 파이프 밸브를 엽니다.",
        "5. Isotank의 녹색 밸브(공기/질소)를 열고 그 후 파이프 밸브를 모니터링하며 점진적으로 엽니다.",
        "6. 3% 암모니아를 사용하여 누출을 점검합니다. 누출이 발생하거나 밸브 연결이 불충분한 경우 흰 연기가 나타납니다. 이 경우 밸브를 닫고 모든 연결을 다시 점검해야 합니다.",
        "7. 추출 중 어느 단계에서든 누출이 발생하면 즉시 녹색 밸브(공기 압력/질소 배출)를 닫고, 그 후 노란색 밸브를 닫습니다.",
      ],
    };

    const lastItemSubTexts: any = {
      0: [],
      1: [
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            EUROPE
          </span>
          : ICL-IP TERNEUZEN HOLLAND
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (31) 11-568-9000
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            U.K.
          </span>
          : FOR EMERGENCY ADVICE
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (44) 1865-407-333
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            U.S.A.
          </span>
          : CHEMTREC
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: 1-800-424-9300
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            SGS Korea
          </span>
          : <span></span>
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: +82 51 630 7043 / 7061
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            SINGAPORE
          </span>
          : ALERT - SGS
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (65) 6542-9595
        </div>,
        <div>
          <span
            style={{
              fontSize: "1.1em",
              color: "yellow",
            }}
          >
            CHINA
          </span>
          : NRCC
        </div>,
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgb(255,255,255,0.4)",
            marginBottom: "0.5em",
          }}
        >
          <PhoneIcon sx={{ marginRight: "0.1em" }} />: (86) 532-8388-9090
        </div>,
      ],
      2: [
        "개인보호장비: ",
        <br />,
        "1. 호흡 보호 장비: 독립형 호흡 장치.",
        "승인된 복합 산성 가스-유기 증기 가스 마스크는 저농도에 단기간 노출되거나 탈출 목적으로만 적합합니다.",
        "NIOSH의 호흡기 선택 권장 사항에는 전면 마스크와 카트리지가 있는 화학 카트리지 호흡기가 포함됩니다. 산화되지 않는 흡착제만 허용됩니다.",
        "2. 손 보호 장비: PVC 또는 네오프렌 장갑.",
        "3. 눈 보호 장비: 화학 안전 고글 또는 안전 안경이 있는 얼굴 보호대.",
        "4. 피부 및 신체 보호: 보호용 불침투성 의복, 안전모, 네오프렌 또는 고무 부츠.",
      ],
    };

    return currentStep.item == 8
      ? lastItemSubTexts[subItemIdx]
      : subTexts[subItemIdx];
  };

  const textByItem: any = {
    0: [
      "다음 비디오의 목적은 브롬을 포함한 Isotank를 올바르게 작동하는 방법을 안내하는 것입니다. 브롬(UN-1744)은 위험 물질이므로 Isotank 주변에 라벨과 표지판이 있습니다. Isotank는 브롬을 운반하기 위해서만 사용되며 내부는 납으로 코팅되어 있습니다. Isotank 프레임은 운송 및 작동 중 탱크를 보호하기 위해 존재합니다.",
    ],
    1: [
      "작업자는 Isotank 본체에 인쇄된 일련 번호와 검사 날짜를 등록해야 합니다.",
    ],
    2: [
      "1. 누출 점검을 위한 3% 농도의 수산화 암모늄.",
      "2. 도구 및 가스켓.",
      "3. 여분의 블라인드 가스켓",
    ],
    3: [
      "작업자는 안전 정보 브로셔에 따라 개인 보호 장비(PPE)를 사용하여 자신을 보호해야 합니다: ",
      "1. 보호복을 착용합니다.",
      "2. 네오프렌 장갑을 착용하고 소매가 장갑 위에 오도록 합니다.",
      "3. 마스크를 착용합니다.",
      "4. 마스크의 밀폐성 테스트를 수행합니다.",
      "5. 헤드드레스를 착용하고 보호복의 지퍼를 닫습니다.",
    ],
    4: subCategoryTexts(currentStep.subItem),
    5: [
      "1. 파이프의 녹색 밸브(공기/질소)를 닫습니다.",
      "2. 파이프의 노란색 밸브(딥 파이프)를 닫습니다.",
      "3. 파이프의 빨간색 밸브(배기)를 엽니다.",
      "4. Isotank의 빨간색 밸브(배기)를 엽니다.",
      "5. 빨간색 밸브를 통해 3% 암모니아를 사용하여 누출을 점검합니다. 누출이 발생하면 흰 연기가 나타나며, 이 경우 작업자는 모든 밸브를 닫고 연결을 다시 점검해야 합니다.",
      "6. Isotank 압력이 해제될 때까지 기다립니다.",
      "7. Isotank의 녹색 밸브를 닫습니다.",
      "8. Isotank의 노란색 밸브를 닫습니다.",
      "9. 시스템의 압력이 0으로 줄어들 때까지 기다립니다.",
      "10. Isotank의 빨간색 밸브를 닫고, 그 후 파이프의 빨간색 밸브를 닫습니다.",
    ],
    6: [
      "1. 나사를 천천히 조심스럽게 엽니다. 먼저 먼 쪽의 나사를 열고 파이프가 분리되지 않도록 잡습니다.",
      "2. 블라인드 가스켓 가방을 열고 밸브 위에 설치합니다.",
      "3. 블라인드 플랜지를 설치하고, 플랜지 나사를 교차로 조여 균형을 유지합니다.",
      "4. 3% 암모니아를 사용하여 누출을 점검합니다. 누출이 발생하면 흰 연기가 나타나며, 이 경우 작업자는 모든 밸브를 닫고 연결을 다시 점검해야 합니다.",
    ],
    7: [
      "1. 돔을 닫기 전에 모든 밸브가 닫혀 있고 블라인드 플랜지가 단단히 조여져 있는지 다시 확인합니다.",
      "2. 돔을 닫습니다.",
      "3. 잠금 핀을 연결합니다.",
      "4. 안전 핀을 연결합니다.",
      "5. 보안 잠금을 설치하고, 잠금 장치에 표시된 번호를 운송 문서에 등록합니다.",
      "6. 사다리를 사용하여 아이소탱크에서 조심스럽게 내려옵니다.",
      "7. Isotank 주변을 시각적으로 점검합니다.",
      "8. 프로세스를 종료합니다.",
    ],
    8: subCategoryTexts(currentStep.subItem),
  };

  return textByItem[currentStep.item] || [""];
};
