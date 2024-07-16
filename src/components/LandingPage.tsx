import { useState } from "react";
import { ChooseLanguage } from "./ChooseLanguage";
import { OpeningVideo } from "./OpeningVideo";

type LandingPageProps = {
  setViewedOpeningVid: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LandingPage({ setViewedOpeningVid }: LandingPageProps) {
  const [language, setLanguage] = useState<string>("");
  //   const [isShouldShowQuestions, setIsShouldShowQuestions] =
  //     useState<boolean>(false);

  const appStart = language ? (
    <OpeningVideo setViewedOpeningVid={setViewedOpeningVid} />
  ) : (
    <ChooseLanguage setLanguage={setLanguage} />
  );

  return <div>{appStart}</div>;
}
