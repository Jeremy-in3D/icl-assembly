import { useState } from "react";
// import { Questionaire } from "./questionnaire/Questionnaire";
import { PdfViewer } from "./common/PdfViewer";
// import { Item } from "./Item";
import { ItemsMenu } from "./steps/ItemsMenu";

function Homepage() {
  // const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  const [openPdf, setOpenPdf] = useState<string>("");
  return (
    <div className="homepage-wrapper">
      {openPdf ? <PdfViewer openPdf={openPdf} setOpenPdf={setOpenPdf} /> : null}
      <ItemsMenu />
    </div>
  );
}

export default Homepage;
