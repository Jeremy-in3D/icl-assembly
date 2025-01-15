import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export function SlideMenu({ toggleMenu }: any) {
  const [slideOpenAni, setSlideOpenAni] = useState(false);
  const [openedItems, setOpenedItems] = useState<number[]>([]);

  const { menuData, setCurrentStep, setMenuOpen } = useAppContext();
  useEffect(() => {
    if (!slideOpenAni) setSlideOpenAni(true);
  }, []);

  const handleItemClick = (itemIdx: number) => {
    if (openedItems.includes(itemIdx)) {
      const openedItemsCopy = [...openedItems];
      const filteredArr = openedItemsCopy.filter((item) => item != itemIdx);
      setOpenedItems(filteredArr);
    } else {
      const openedItemsCopy = [...openedItems, itemIdx];
      setOpenedItems(openedItemsCopy);
    }
    // setMenuOpen(false);
  };

  const handleSubItemClick = (itemIdx: number, subItemIdx: number) => {
    setCurrentStep({ item: itemIdx, subItem: subItemIdx });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="backdrop" onClick={toggleMenu}></div>
      <div className={`slide-menu ${slideOpenAni ? "open" : ""}`}>
        {/* Content for the sliding menu */}
        <div style={{ height: "11%" }}></div>
        {/* <p>Menu Item 1</p>
        <p>Menu Item 2</p>
        <p>Menu Item 3</p> */}
        <div style={{ position: "relative", left: "60%" }}>
          <button
            style={{
              background: "rgb(40, 39, 39)",
              borderRadius: "12px",
              color: "white",
              padding: "6px",
            }}
            onClick={() => {
              setCurrentStep(null);
              setMenuOpen(false);
            }}
          >
            Back To Menu
          </button>
        </div>
        <ul className="ul-styles" style={{ border: "none" }}>
          {menuData.length
            ? menuData.map((item: any, itemIdx: number) => (
                <li
                  key={`item-${itemIdx}`}
                  onClick={() => handleItemClick(itemIdx)}
                  className={`menu-item-list-item  ${
                    itemIdx % 2 == 0 ? "lighter-grey" : "darker-grey"
                  }`}
                  style={{
                    marginTop: "1em",
                    fontSize: "1em",
                    listStyleType: "circle",
                    borderBottom: "none",
                    borderRadius: "8px",
                  }}
                >
                  <div className="item-text">
                    <div>
                      {`${itemIdx + 1}. `}{" "}
                      <span style={{ marginLeft: "0.5em" }}>{item.item}</span>
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
                        // background: "rgb(233, 231, 231)",
                        // borderRadius: "4px",
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
                                  borderRadius: "8px",

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
                                  {`${String.fromCharCode(97 + subItemIdx)}.`}{" "}
                                  <span>{` ${subItem[subItemIdx].text}`}</span>
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
      </div>
    </>
  );
}
