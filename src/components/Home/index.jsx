import React, { useState, useContext, useEffect } from "react";
import "./home.css";
import DragAndDropImage from "../DragAndDropImage";
import Sidebar from "../Sidebar";
import ImageCrop from "../ImageCrop";
import ShowItems from "../Showitems";
import { imgData } from "../../storage/storage";
import ReplayIcon from "@material-ui/icons/Replay";
import { Card } from "@material-ui/core";
import { ScreenContext } from "../Swiper";
import Addcomponent from "../Addcomponent";
import Hamburger from "../Hamburger";
import { localStoreData, getLocalStoreData } from "../../storage/storage";

const Home = ({ onChange, data, screenNum }) => {
  const [imgSrc, setGetImg] = useState();
  const [srcName,   ] = useState("");
  const [crop, setCrop] = useState();
  const [croppedData, setCroppedData] = useState();

  const [sidebar, setSidebar] = useState(false);
  const [history, setHistory] = useState(false);
  const cropValues = { unit: "px", x: 1000, y: 800, width: 0 };

  const screenPayload = useContext(ScreenContext);
  let value = 0;
  const obj = {};
  const storeImage = (img, data) => {
    // debugger;
    obj["dataObj"] = {
      name: data.name,
      screenSrc: img,
      components: [],
    };
    localStoreData({ type: "imgSrcNamePush", payLoad: obj });
  };

  const checkToolSelected = value => {
    //  debugger;
    switch (value) {
      case "RELOAD":
        setGetImg("");
        setSidebar(false);
        break;
      case "CROP":
        return (
          <ImageCrop
            screenDetails={{ screenNum, srcName }}
            scrNum={screenNum}
            img={imgSrc}
            cropData={data}
            altTitle={"Your Uploaded Image"}
            defaultCrop={cropValues}
            onChange={e => {}}
          />
        );
        break;
      case "ADD_SCREEN":
        return (
          <ImageCrop
            screenDetails={{ screenNum, srcName }}
            imgSrcName={srcName}
            img={imgSrc}
            cropData={data}
            altTitle={"Your Uploaded Image"}
            defaultCrop={cropValues}
            locked={true}
            onChange={e => {
              // onChange("ADD_SCREEN");
              console.log("Home:" + screenNum);
            }}
          />
        );
        break;
      case "TIMER":
        return (
          <div>
            <ImageCrop
              screenDetails={{ screenNum, srcName }}
              imgSrcName={srcName}
              img={imgSrc}
              cropData={data}
              altTitle={"Your Uploaded Image"}
              defaultCrop={cropValues}
              locked={true}
              onChange={e => {}}
            />
          </div>
        );

        break;

      default:
        return (
          <img
            src={imgSrc}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
            }}
          />
        );
    }
  };

  useEffect(() => {
    if (getLocalStoreData()) {
      setSidebar(true);
      const info = getLocalStoreData();
      console.log(info);
      // setOutLineData(info);
    }
  }, []);

  return (
    <div className="home">
      <div className="home__image-container">
        <div className="home__image-container--wrapper">
          {imgSrc ? (
            checkToolSelected(crop)
          ) : (
            <DragAndDropImage
              screenDetails={{ screenNum, srcName }}
              accept="image/*"
              multiple={false}
              onChange={(img, data) => {
               
                storeImage(img, data);
                setGetImg(img);
                setSidebar(true);
              }}
              bool={true}
              isCrop={crop}
            ></DragAndDropImage>
          )}
        </div>
        {history ? (
          <ShowItems
            title={"Components"}
            className={""}
            screenNum={screenNum}
            onChange={() => {
              setHistory(false);
            }}
          />
        ) : (
          ""
        )}

        <Sidebar
          crop={sidebar}
          screenNum={screenNum}
          onChange={e => {
            // debugger;
            console.log(e);
            if (e == undefined) {
              setHistory(true);
            } else {
              setCrop(e);
              console.log("i am triggered here also");
            }
            if (e == "ADD_SCREEN") {
              onChange();
            }
          }}
        />
      </div>
      {imgSrc ? imgData(imgSrc) : ""}
    </div>
  );
};

export default Home;
