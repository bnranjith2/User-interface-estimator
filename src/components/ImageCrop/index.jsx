import React, { Component, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "./imagecrop.css";

import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile,
  downloadBase64File,
  image64CroppedData,
} from "../../utils/crop-download";
import { getLocalStoreData, localStoreData } from "../../storage/storage";
import Addcomponent from "../Addcomponent";
import uuid from "react-uuid";


class ImageCrop extends Component {
  constructor(props) {
    super();
    this.imagePreviewCanvas = React.createRef();

    this.state = {
      screenDetails: props.screenDetails,
      srcImg: props.img,
      crop: props.defaultCrop,
      screenPayload: "",
      cropEnd: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      croppedImage: "",
      holdState: [],
      changeState: false,
      currentCropData: "",
      componentName: [],
      value:''
    };
  }


  cropdata = getLocalStoreData();

  handleCropEnd = e => {
    this.setState({
      cropEnd: !this.state.cropEnd,
      currentCropData: "",
    });
  };

  handleCropComplete = () => {
    this.setState({ bool: !this.state.bool });
  };

  handleOnCrop = newCrop => {
    this.setState({
      crop: newCrop,
      x: newCrop.x,
      y: newCrop.y,
      width: newCrop.width,
      height: newCrop.height,
      caption: [],
      changeState: false,
    });
    const canvasRef = this.imagePreviewCanvas.current;
    image64toCanvasRef(canvasRef, this.state.srcImg, newCrop);
  };
  handleEditClick = e => {
    const value = e.target.attributes[1].value;
   this.setState({value:value})
    console.log(value);
    const storedData = getLocalStoreData();
    this.setState({
      currentCropData:
        storedData[this.state.screenDetails.screenNum]["dataObj"].components[
          value
        ],
    });

    this.setState({ cropEnd: !this.state.cropEnd });
  };
  handleDownloadClick = () => {
    const canvasRef = this.imagePreviewCanvas.current;
    const fileExtension = extractImageFileExtensionFromBase64(
      this.state.srcImg
    );
    const canvasCroppedData64 = canvasRef.toDataURL("image/" + fileExtension);
    const fileName = "previewFile" + fileExtension;
    const NewCroppedFile = base64StringtoFile(this.state.srcImg, fileName);
    //  downloadBase64File(canvasCroppedData64, NewCroppedFile);
    return canvasCroppedData64;
  };
  componentDidMount() {
    const getData = getLocalStoreData();
    this.setState({
      holdState:
        getData[this.state.screenDetails.screenNum]["dataObj"].components,
    });
  }
  render() {
    const { altTitle } = this.props;
    const { crop } = this.state;
    const { bool } = this.state;
    const { onChange } = this.props;
    const { cropData } = this.props;
    let dimenson;
    let value = 0;
    // const screenPayload = this.context;

    return (
      <div>
        <ReactCrop
          src={this.state.srcImg}
          alt={altTitle}
          crop={crop}
          onChange={this.handleOnCrop}
          onDragEnd={this.handleCropEnd}
          onCompleted={() => {
            this.setState({
              bool: !this.state.bool,
              cropEnd: !this.state.cropEnd,
            });
          }}
        >
          {this.state.holdState.map((cropInfo, index) => (
            <div
              className="croppedBox"
              style={{
                position: "absolute",
                width: cropInfo.dimension.width,
                height: cropInfo.dimension.height,
                left: cropInfo.dimension.left,
                top: cropInfo.dimension.top,
                border: "2px dotted white",
              }}
            >
             
              <div
                className="crop__tag"
                value={value++} //if you chang the locatio
                onClick={this.handleEditClick}
                classname="reactcrop__details"
                style={{
                  position: "absolute",
                  width: "20px",
                  color: "white",
                  textAlign: "center",
                  height: "20px",
                  left: cropInfo.dimension.width,
                  bottom: cropInfo.dimension.height,
                  backgroundColor: "#5dbcd2",
                  fontSize: "15px",
                  borderRadius: "50%",
                }}
              >
                c
              </div>
            </div>
          ))}
        </ReactCrop>

        {this.state.cropEnd ? (
          <Addcomponent
            data={{ type: "UPDATE", payload: this.state.currentCropData }}
            onChange={e => {
              if (e == "CLOSE") {
                this.setState({ cropEnd: !this.state.cropEnd });
              } else {
                const getData = getLocalStoreData();
                const croppedImg = this.handleDownloadClick();
                this.setState({
                  componentName: [...this.state.componentName, e[0]],
                });
                getData.map((data, index) => {
                  debugger;
                  if (index == this.state.screenDetails.screenNum) {
                    if (e.value) {
                      data["dataObj"].components[this.state.value].estTime =
                        e.time;
                      data["dataObj"].components[this.state.value].estUnit =
                        e.timeUnit;
                      data["dataObj"].components[this.state.value].name =
                        e.name;
                    } else {
                      data["dataObj"].components.push({
                        id: uuid(),
                        name: e.name,
                        estTime: e.time,
                        estUnit: e.timeUnit,
                        dimension: {
                          top: this.state.y,
                          left: this.state.x,
                          height: this.state.height,
                          width: this.state.width,
                        },
                        componentSrc: croppedImg,
                      });
                    }
                  }
                });

                localStoreData({ type: "imgDataPush", payLoad: getData });
                this.setState({
                  holdState:
                    getData[this.state.screenDetails.screenNum]["dataObj"]
                      .components,
                  cropEnd: !this.state.cropEnd,
                });
              }
            }}
          />
        ) : (
          ""
        )}

        <canvas className="canvas__display" ref={this.imagePreviewCanvas} />
      </div>
    );
  }
}

export default ImageCrop;
