import React from 'react'

export default function DottedBorder({data,screenNum}) {
    return (
        
        <div>
           {  data["dataObj"].components.map((cropInfo) => {
                <div
                  className="croppedBox"
                  style={{
                    position: "absolute",
                    width: cropInfo.dimension.width,
                    height: cropInfo.dimension.height,
                    left:
                      cropInfo.dimension.left -
                      cropInfo.dimension.width,
                    top: cropInfo.dimension.top,
                    border: "2px dotted white",
                  }}
                >
                  <div
                    className="crop__tag"
                    //  value={++value}
                    // onClick={this.handleEditClick}
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
           })
            
        }
    
        </div>
    )
}
