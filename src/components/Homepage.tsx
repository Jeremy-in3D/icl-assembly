import { useEffect, useState } from "react";
// import { Questionaire } from "./questionnaire/Questionnaire";
// import { PdfViewer } from "./common/PdfViewer";
// import { Item } from "./Item";
import { ItemsMenu } from "./steps/ItemsMenu";
import { useAppContext } from "../context/appContext";
import { getItemsData } from "../common/getItemData";
import { useTranslation } from "react-i18next";

const numberOfSteps = 8;

function Homepage() {
  const { menuData, setMenuData } = useAppContext();
  const [_, forceRender] = useState(0);
  const { i18n } = useTranslation();

  useEffect(() => {
    forceRender((prev) => prev + 1);
    console.log("heyoo");
  }, [i18n.language]);

  let itemDataArr: any[] = [];
  for (let i = 0; i <= numberOfSteps; i++) {
    const itemDataByIdx = getItemsData(i);

    itemDataArr.push(itemDataByIdx);
  }

  useEffect(() => {
    if (!menuData.length) {
      setMenuData(itemDataArr);
    }
  }, [menuData]);

  return (
    <div className="homepage-wrapper">
      {/* {openPdf ? <PdfViewer openPdf={openPdf} setOpenPdf={setOpenPdf} /> : null} */}
      <div style={{ height: "100px", background: "rgb(0,0,0,0.5)" }}></div>
      <ItemsMenu />
    </div>
  );
}

export default Homepage;
