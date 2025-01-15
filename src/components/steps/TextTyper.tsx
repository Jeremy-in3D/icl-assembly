// import { useEffect, useState } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

export const Typewriter = ({ text }: any) => {
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
        marginTop: "10px",
        fontFamily: "crimson-reg",
        background: "rgb(0,0,0,0.9)",
        padding: "10px",
        fontSize: "1.2em",
      }}
    >
      {<RecordVoiceOverIcon fontSize="small" />} {text}
    </div>
  );
};
