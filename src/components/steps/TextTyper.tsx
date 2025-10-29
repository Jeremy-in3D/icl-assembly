import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PhoneIcon from "@mui/icons-material/Phone";
import { Trans, useTranslation } from "react-i18next";
import React from "react";

type Step = {
  item: number;
  subItem?: number;
};

const getStepKey = (currentStep: Step) => {
  const hasSubItems = currentStep.item === 4 || currentStep.item === 8; // adjust if more items have sub-steps
  return hasSubItems
    ? `steps.${currentStep.item}.${currentStep.subItem ?? 0}`
    : `steps.${currentStep.item}`;
};

export const Typewriter = ({
  currentStep,
  isRegularStep,
}: {
  currentStep: Step;
  isRegularStep?: boolean;
}) => {
  // Keep original hide rule
  if (currentStep.item === 8 && currentStep.subItem === 1 && isRegularStep) {
    return null;
  }

  const { t } = useTranslation("translation");

  const baseKey = getStepKey(currentStep);
  const raw = t(baseKey, { returnObjects: true }) as unknown;

  const lines: string[] = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
    ? [raw]
    : [];

  return (
    <div
      style={{
        color: "white",
        marginTop: "5px",
        fontFamily: "crimson-reg",
        background: "rgba(0,0,0,0.9)",
        padding: "10px",
        fontSize: "1.2em",
      }}
    >
      <RecordVoiceOverIcon fontSize="small" />
      <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
        {lines.map((_, idx) => {
          const indentForEmergencyPhones =
            currentStep.item === 8 &&
            currentStep.subItem === 1 &&
            idx % 2 !== 0;

          const liStyle: React.CSSProperties = {
            ...(indentForEmergencyPhones ? { marginLeft: "1em" } : {}),
          };

          // For array values, each line is steps.X.Y.idx
          const lineKey = Array.isArray(raw) ? `${baseKey}.${idx}` : baseKey;

          return (
            <li key={`line-${idx}`} style={liStyle}>
              <Trans
                ns="translation"
                i18nKey={lineKey}
                components={{
                  highlight: (
                    <span style={{ fontSize: "1.1em", color: "yellow" }} />
                  ),
                  phone: <PhoneIcon sx={{ marginRight: "0.1em" }} />,
                  br: <br />,
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
