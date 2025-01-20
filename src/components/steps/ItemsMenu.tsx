import { useState, Suspense } from "react";
// import { getItemsData } from "../../common/getItemData";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { t } from "../../common/t";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Item from "./Steps";
import { useAppContext } from "../../context/appContext";

// const numberOfSteps = 9;

export function ItemsMenu() {
  const [openedItems, setOpenedItems] = useState<number[]>([]);
  const { currentStep, setCurrentStep, menuData } = useAppContext();

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
    setOpenedItems([]);
    setCurrentStep({ item: itemIdx, subItem: subItemIdx });
  };

  // console.log({ menuData });

  return (
    <div style={{ height: "100%" }}>
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
    <div style={{ marginTop: "1em", height: "100%" }}>
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
                <div className="item-text">
                  <div style={{ display: "flex" }}>
                    {/* item text? */}
                    <div
                      style={{
                        flex: 1,
                        textWrap: "nowrap",
                        // width: "50%",
                      }}
                    >{`Item ${itemIdx + 1}: `}</div>
                    {/* text text */}
                    <div
                      style={{
                        marginLeft: "0.5em",
                      }}
                    >
                      {item.item}
                    </div>
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
                      marginTop: "1em",
                      paddingLeft: "1em",
                    }}
                  >
                    {item.subItems?.length
                      ? item.subItems.map(
                          (subItem: any, subItemIdx: number) => (
                            <li
                              key={`subItem-${subItemIdx}`}
                              style={{
                                // background: "rgb(233, 231, 231)",
                                background:
                                  subItemIdx % 2 == 0
                                    ? "rgb(233, 231, 231)"
                                    : "rgb(197, 194, 194)",
                                borderRadius: "4px",

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
                              <div className="sub-item-menu-text">
                                <div>{`${String.fromCharCode(
                                  97 + subItemIdx
                                )}.`}</div>
                                <div
                                  style={{ marginLeft: "5px" }}
                                >{` ${subItem[subItemIdx].text}`}</div>
                              </div>
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
          {t("start")} <KeyboardArrowRightIcon sx={{ marginLeft: "5px" }} />
        </button>
      </div>
      <div style={{ height: "40px" }}></div>
    </div>
  );
};
