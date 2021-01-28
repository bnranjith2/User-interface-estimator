import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import "./image-container.css";
import Button from "../Buttons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageCrop from "../ImageCrop";
import Addcomponent from "../Addcomponent";
import classnames from "classnames";
import { getLocalStoreData } from "../../storage/storage";
import DottedBorder from "../DottedBorder";

const DragAndDropImage = ({
  acceptFileType,
  screenDetails,
  multipleFiles,
  onChange,
  isCrop,
  bool,
}) => {
  console.log(screenDetails.screenNum);
  const [imgSrc, setImgSrc] = useState(null);
  const [outlineData, setOutlineData] = useState();
  // const [fileNmae,setFilename]
  const [imgLoaded, setImageLoaded] = useState(false);
  const [cropInfo, setCropInfo] = useState();

  const [screenData, setScreenData] = useState();

  const cropValues = { unit: "px", x: 1000, y: 800, width: 0 };

  const handleOnDrop = acceptedFile => {
    const currentFile = acceptedFile[0];
    //console.log(currentFile)

    // setFilename(currentFile);
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setImgSrc(reader.result);
        onChange(reader.result, currentFile);
      },
      false
    );
    reader.readAsDataURL(currentFile);
  };
  const handleImgLoad = () => {
    setImageLoaded(true);
    const getLocalStoreageData = getLocalStoreData();
    setOutlineData(
      getLocalStoreageData[screenDetails.screenNum]["dataObj"].components
    );
  };
  useEffect(() => {
    if (getLocalStoreData()) {
      const getLocalStoreageData = getLocalStoreData();
      getLocalStoreageData.map((item, index) => {
        if (index === screenDetails.screenNum) {
          const srcName = item["dataObj"].name;
          const screenNum = index;
          setScreenData({ screenNum, srcName });
          setImgSrc(item["dataObj"].screenSrc);
        }
      });
    }
  }, []);

  return (
    <div>
      {imgSrc ? (
        isCrop ? (
          <div>
            <ImageCrop
              screenDetails={screenData}
              img={imgSrc}
              altTitle={"Your Uploaded Image"}
              defaultCrop={cropValues}
            
            ></ImageCrop>
          </div>
        ) : (
          <div>
         
            <img
              className="img"
              src={imgSrc}
              alt="Your Uploaded Design"
              onLoad={handleImgLoad}
              style={{
                // display: "none",
              }}
            />
          
          <div>
          
              </div>
          </div>
        )
      ) : (
        <Dropzone
          accept={acceptFileType}
          multiple={multipleFiles}
          onDrop={handleOnDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className={classnames({ sidebar__tool: true })}
                className={"image-container"}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div>
                  {bool ? <Button className={"button--add"} label={"+"} /> : ""}
                </div>
                <div
                  className={classnames({ "image-container__title": !bool })}
                >
                  Insert An Image
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      )}
       
    </div>
  );
};
export default DragAndDropImage;
