import classnames from "classnames";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./showitems.css";
import Card from "../Card";
import Button from "../Buttons";
import CloseIcon from "@material-ui/icons/Close";
import { showData, getLocalStoreData } from "../../storage/storage";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
const defaultProps = {};

const propTypes = {};

const ShowItems = ({
  onChange,
  screenNum,
  display,
  content,
  className,
  title,
}) => {
  // debugger
  //   console.log("I am also triggered");
  const [modalClass, setModalClass] = useState("");
  const [displayCropped, setDisplayCropped] = useState(false);
  const [croppedDetails, setCroppedDetails] = useState("");
  let count = 0;

  const closeModal = () => {
    setModalClass("showitemscontainer--close-modal");
    onChange();
  };
  const displayCroppedImages = () => {};

  const handleClick = () => {
    setDisplayCropped(true);
  };
  const data = getLocalStoreData();
  // console.log(screenNum);
  // console.log(data);
  //   debugger;

  useEffect(() => {
    if (getLocalStoreData()) {
      const getLocalStroageData = getLocalStoreData();
    }
  });
  return (
    <div
      className={classnames({
        showitemscontainer: true,
        [className]: className,
      })}
    >
      <header className="showitemscontainer__header">
        {title}
        <Button
          label={<CloseIcon />}
          className="button--close-components"
          onClick={closeModal}
        />
        <div
          onClick={() => {
            setDisplayCropped(false);
          }}
          className={classnames({
            "showitemscontainer--cropped-img__close-modal": true,
            ["showitemscontainer--cropped-img__close-modal--active"]: displayCropped,
          })}
        >
          <KeyboardBackspaceIcon />
        </div>
      </header>

      {className != "showitemscontainer--tabs" ? (
        <div className="showitemscontainer__item-wrapper">
          {data[0] ? (
            data[screenNum].dataObj.components.map(x => {
              return (
                <Card
                  name={x.name}
                  estTime={x.estTime}
                  estUnit={x.estUnit}
                  imgsrc={x.componentSrc}
                  height={x.dimension.height}
                />
              );
            })
          ) : (
            <Card name={""} />
          )}
        </div>
      ) : (
        <div className="showitemscontainer--tabs__wrapper">
          {data[0] &&
            data.map((x, index) => {
              // debugger;

              return (
                <div className="showitemscontainer--tabs__img-container">
                  <img
                    value={count++}
                    src={x.dataObj.screenSrc}
                    onClick={e => {
                      // debugger;
                      // console.log(e);
                      setCroppedDetails(e.target.attributes[0].value);

                      handleClick();
                    }}
                  />
                </div>
              );
            })}
          <div className="showitemscontainer__item-wrapper__header">Hello</div>
          {displayCropped ? (
            <div className="showitemscontainer showitemscontainer--cropped-img">
              {data[croppedDetails].dataObj.components.map(data => {
                // debugger;

                return (
                  <div className="wrapper">
                    <Card
                      className={"card--no-border"}
                      name={data.name}
                      estTime={data.estTime}
                      estUnit={data.estUnit}
                      imgsrc={data.componentSrc}
                      height={data.dimension.height}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

// ShowItems.defaultProps = defaultProps;
// ShowItems.propTypes = propTypes;
export default ShowItems;
