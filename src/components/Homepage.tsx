import { useState } from "react";
// import { Questionaire } from "./questionnaire/Questionnaire";
import { PdfViewer } from "./common/PdfViewer";
// import { Item } from "./Item";
import { ItemsMenu } from "./steps/ItemsMenu";

function Homepage({ setQuestionaireSelectd }: any) {
  // const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  const [openPdf, setOpenPdf] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<any>(null); //({ item: 0, subItem: 1 });
  return (
    <div className="homepage-wrapper">
      {openPdf ? <PdfViewer openPdf={openPdf} setOpenPdf={setOpenPdf} /> : null}
      {/* <Questionaire
        isAssemble={isAssemble}
        setIsAssemble={setIsAssemble}
        setQuestionaireSelect={setQuestionaireSelect}
        setOpenPdf={setOpenPdf}
      /> */}
      {!currentItem ? <ItemsMenu setCurrentItem={setCurrentItem} /> : null}
      {/* {itemNmbr > 0 ? (
        <Item itemNmbr={itemNmbr} setItemNmbr={setItemNmbr} />
      ) : null} */}
    </div>
  );
}

export default Homepage;
