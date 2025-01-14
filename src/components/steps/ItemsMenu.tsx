import { useState, Suspense } from "react";
import { getItemsData } from "../../common/getItemData";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { t } from "../../common/t";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Item from "./Steps";
import { useAppContext } from "../../context/appContext";

const numberOfSteps = 9;

export function ItemsMenu() {
  const [menuData, setMenuData] = useState<any[]>([]);
  const [openedItems, setOpenedItems] = useState<number[]>([]);

  const { currentStep, setCurrentStep } = useAppContext();

  let itemDataArr: any[] = [];

  for (let i = 0; i <= numberOfSteps; i++) {
    const itemDataByIdx = getItemsData(i);
    // console.log(itemDataByIdx);
    itemDataArr.push(itemDataByIdx);
  }

  if (!menuData.length) {
    setMenuData(itemDataArr);
  }

  const handleItemClick = (itemIdx: number) => {
    if (openedItems.includes(itemIdx)) {
      const openedItemsCopy = [...openedItems];
      const filteredArr = openedItemsCopy.filter((item) => item != itemIdx);
      setOpenedItems(filteredArr);
    } else {
      const openedItemsCopy = [...openedItems, itemIdx];
      setOpenedItems(openedItemsCopy);
    }
  };

  const handleSubItemClick = (itemIdx: number, subItemIdx: number) => {
    setCurrentStep({ item: itemIdx, subItem: subItemIdx });
  };

  // console.log({ menuData });

  return (
    <div>
      {!currentStep ? (
        <Menu
          menuData={menuData}
          handleItemClick={handleItemClick}
          openedItems={openedItems}
          handleSubItemClick={handleSubItemClick}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        <Suspense fallback={null}>
          <Item currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </Suspense>
      )}
    </div>
  );
}

const Menu = ({
  menuData,
  handleItemClick,
  openedItems,
  handleSubItemClick,
  setCurrentStep,
}: any) => {
  return (
    <div>
      <ul className="ul-styles">
        {menuData.length
          ? menuData.map((item: any, itemIdx: number) => (
              <li
                key={`item-${itemIdx}`}
                onClick={() => handleItemClick(itemIdx)}
                className={`menu-item-list-item  ${
                  itemIdx % 2 == 0 ? "lighter-grey" : "darker-grey"
                }`}
              >
                <div
                  className="item-text"
                  // onClick={() => handleItemClick(itemIdx)}
                >
                  <div>
                    {`${itemIdx + 1}. `} {item.item}
                  </div>
                  <div>
                    {openedItems.includes(itemIdx) ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </div>
                </div>

                {openedItems.includes(itemIdx) ? (
                  <ul
                    style={{
                      background: "rgb(233, 231, 231)",
                      borderRadius: "4px",
                      marginTop: "1em",
                    }}
                  >
                    {item.subItems?.length
                      ? item.subItems.map(
                          (subItem: any, subItemIdx: number) => (
                            <li
                              key={`subItem-${subItemIdx}`}
                              style={{
                                borderBottom:
                                  itemIdx == 4
                                    ? "1px solid rgb(0, 0, 0, 0.4)"
                                    : "",
                              }}
                              className="menu-subitem-list-item"
                              onClick={() =>
                                handleSubItemClick(itemIdx, subItemIdx)
                              }
                            >
                              <span className="sub-item-menu-text">
                                {subItem[subItemIdx].text}
                              </span>
                            </li>
                          )
                        )
                      : null}
                  </ul>
                ) : null}
              </li>
            ))
          : null}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "4px",
          marginTop: "2em",
        }}
      >
        <button
          className="menu-start-btn"
          onClick={() => setCurrentStep({ item: 0, subItem: 0 })}
        >
          {t("start")} <KeyboardArrowRightIcon />
          {/* {t("taskOne")} <KeyboardArrowRightIcon /> */}
        </button>
      </div>
      <div style={{ height: "40px" }}></div>
    </div>
  );
};
