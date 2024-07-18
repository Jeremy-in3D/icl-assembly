import { useState } from "react";
import { ChooseLanguage } from "./ChooseLanguage";
import { OpeningVideo } from "./OpeningVideo";

type LandingPageProps = {
  setViewedOpeningVid: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export function LandingPage({
  setViewedOpeningVid,
  setCurrentLanguage,
}: LandingPageProps) {
  const [language, setLanguage] = useState<string>("");
  //   const [isShouldShowQuestions, setIsShouldShowQuestions] =
  //     useState<boolean>(false);

  const appStart = language ? (
    <OpeningVideo setViewedOpeningVid={setViewedOpeningVid} />
  ) : (
    <ChooseLanguage
      setLanguage={setLanguage}
      setCurrentLanguage={setCurrentLanguage}
    />
  );

  return <div>{appStart}</div>;
}
