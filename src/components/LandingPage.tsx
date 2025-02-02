import { useEffect, useState } from "react";
import { ChooseLanguage } from "./ChooseLanguage";
// import Modal from "react-modal";
// import { Position } from "@react-pdf-viewer/core";
// import { OpeningVideo } from "./OpeningVideo";

// Modal.setAppElement("#root");

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

  if (language) {
    console.log(language);
  }

  const appStart = language ? (
    //   <OpeningVideo setViewedOpeningVid={setViewedOpeningVid} />
    <IntroText setViewedOpeningVid={setViewedOpeningVid} />
  ) : (
    <ChooseLanguage
      setLanguage={setLanguage}
      setCurrentLanguage={setCurrentLanguage}
    />
  );
  // );

  return <div style={{ height: "100%" }}>{appStart}</div>;
}

type IntroTextProps = {
  setViewedOpeningVid: React.Dispatch<React.SetStateAction<boolean>>;
};

const IntroText = ({ setViewedOpeningVid }: IntroTextProps) => {
  // const [modalIsOpen, setIsOpen] = useState(true);
  const [hasSeenAni, setHasSeenAni] = useState(false);

  useEffect(() => {
    if (!hasSeenAni) {
      setTimeout(() => setHasSeenAni(true), 1000);
    }
  }, []);

  return (
    <div
      style={{
        height: "100%",
        // position: "absolute",
        // border: "1px solid yellow",
        // background: "rgb(0,0,0,0.5)",
        // height: "50%",
        // zIndex: 500,
        // width: "50%",
      }}
    >
      {/* Some Text
      <ModalComponent
        setViewedOpeningVid={setViewedOpeningVid}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        hasSeenAni={hasSeenAni}
      /> */}
      <TextComponent
        setViewedOpeningVid={setViewedOpeningVid}
        // setIsOpen={setIsOpen}
        hasSeenAni={hasSeenAni}
      />
    </div>
  );
};

// const customStyles = {
//   content: {
//     backgroundImage: "url(/assets/images/icl-symbol.png)",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     backgroundSize: "contain",
//     backgroundColor: "white",
//     padding: 0,
//     // position: "absolute",
//     // height: "100%",
//   },
// };

// type ModalProps = {
//   setViewedOpeningVid: React.Dispatch<React.SetStateAction<boolean>>;
//   modalIsOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   hasSeenAni: boolean;
// };

// const ModalComponent = ({
//   setViewedOpeningVid,
//   modalIsOpen,
//   setIsOpen,
//   hasSeenAni,
// }: ModalProps) => (
//   <>
//     <Modal
//       isOpen={modalIsOpen}
//       // onRequestClose={closeModal}
//       style={customStyles}
//       contentLabel="Example Modal"
//       onAfterClose={() => {
//         // setIsDescriptionModal(false);
//         setViewedOpeningVid(true);
//       }}
//       // sty
//     >
//       <div
//         className={` ${hasSeenAni ? "fade-in-stay" : "no-opacity"}`}
//         style={{
//           width: "100%",
//         }}
//       >
//         <div
//           style={{
//             // color: "black",
//             marginTop: "4em",
//             fontFamily: "crimson-reg",
//             fontSize: "1.3em",
//             color: "black",
//             width: "96%",
//             // padding: "6 .px",
//             overflowX: "hidden",
//           }}
//         >
//           <p style={{ overflowX: "hidden" }}>
//             <span style={{ fontWeight: "bold" }}>Welcome</span> to this safety
//             training video, designed to guide operators in the proper handling
//             and unloading procedures for Bromine-containing Isotanks. Bromine
//             (UN-1744) is a hazardous material, and as such, you will encounter
//             various safety labels and warning signs on the Isotank. These
//             containers are specially designed for transporting Bromine and are
//             internally coated with lead to ensure safe transit. This video will
//             walk you through essential safety protocols, including preparation,
//             personal protective equipment (PPE), proper unloading techniques,
//             and emergency procedures to ensure a safe and efficient process.
//           </p>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "1em",
//           }}
//         >
//           <button
//             onClick={() => {
//               console.log("HAGA");
//               setIsOpen(false);
//               setViewedOpeningVid(true);
//             }}
//             style={{
//               // all: "unset",
//               borderRadius: "12px",
//               border: "1px solid rgb(0,0,0,0.6)",
//               padding: "5px",
//               fontSize: "1.2em",
//               background: "none",
//             }}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </Modal>
//   </>
// );

const TextComponent = ({ setViewedOpeningVid, hasSeenAni }: any) => {
  return (
    <div
      className={` ${hasSeenAni ? "fade-in-stay" : "no-opacity"}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          // color: "black",
          marginTop: "6em",
          fontFamily: "crimson-reg",
          fontSize: "1.3em",
          color: "black",
          width: "96%",
          // padding: "6 .px",
          overflowX: "hidden",
          border: "1px solid rgb(0,0,0,0.6)",
          borderRadius: "12px",
          padding: "8px",
        }}
      >
        <p style={{ overflowX: "hidden" }}>
          Welcome to this safety training video, designed to guide operators in
          the proper handling and unloading procedures for Bromine-containing
          Isotanks. Bromine (UN-1744) is a hazardous material, and as such, you
          will encounter various safety labels and warning signs on the Isotank.
          These containers are specially designed for transporting Bromine and
          are internally coated with lead to ensure safe transit. This video
          will walk you through essential safety protocols, including
          preparation, personal protective equipment (PPE), proper unloading
          techniques, and emergency procedures to ensure a safe and efficient
          process.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        <button
          onClick={() => {
            console.log("HAGA");
            // setIsOpen(false);
            setViewedOpeningVid(true);
          }}
          style={{
            // all: "unset",
            borderRadius: "12px",
            border: "1px solid rgb(0,0,0,0.6)",
            padding: "5px",
            fontSize: "1.2em",
            background: "none",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
