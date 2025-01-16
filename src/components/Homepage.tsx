import { useEffect, useState } from "react";
// import { Questionaire } from "./questionnaire/Questionnaire";
// import { PdfViewer } from "./common/PdfViewer";
// import { Item } from "./Item";
import { ItemsMenu } from "./steps/ItemsMenu";
import { useAppContext } from "../context/appContext";
import { getItemsData } from "../common/getItemData";

const numberOfSteps = 9;

function Homepage() {
  // const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  // const [openPdf, setOpenPdf] = useState<boolean>(false);
  const { menuData, setMenuData } = useAppContext();

  let itemDataArr: any[] = [];
  for (let i = 0; i <= numberOfSteps; i++) {
    const itemDataByIdx = getItemsData(i);
    // console.log(itemDataByIdx);
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
      <ItemsMenu />
    </div>
  );
}

export default Homepage;
