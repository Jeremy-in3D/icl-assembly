import { useEffect } from "react";
// import { Questionaire } from "./questionnaire/Questionnaire";
// import { PdfViewer } from "./common/PdfViewer";
// import { Item } from "./Item";
import { ItemsMenu } from "./steps/ItemsMenu";
import { useAppContext } from "../context/appContext";
import { getItemsData } from "../common/getItemData";
import { useTranslation } from "react-i18next";
import { preloadVideos } from "../common/preloadVideos";

const numberOfSteps = 8;

function Homepage() {
  // const [isAssemble, setIsAssemble] = useState<boolean | null>(null);
  // const [openPdf, setOpenPdf] = useState<boolean>(false);
  const { setMenuData, setVideosPreloaded, videosPreloaded } = useAppContext();

  const { i18n } = useTranslation();

  let itemDataArr: any[] = [];
  for (let i = 0; i <= numberOfSteps; i++) {
    const itemDataByIdx = getItemsData(i);

    itemDataArr.push(itemDataByIdx);
  }

  useEffect(() => {
    setMenuData(itemDataArr);
  }, [i18n.language]);

  useEffect(() => {
    preloadVideos({ setVideosPreloaded, videosPreloaded });
  }, []);

  return (
    <div className="homepage-wrapper">
      {/* {openPdf ? <PdfViewer openPdf={openPdf} setOpenPdf={setOpenPdf} /> : null} */}
      <div style={{ height: "100px", background: "rgb(0,0,0,0.5)" }}></div>
      <ItemsMenu />
    </div>
  );
}

export default Homepage;
