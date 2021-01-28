import React, { useState,useEffect } from "react";
import "./sidebar.css";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import CropFreeIcon from "@material-ui/icons/CropFree";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import { showItem } from "../../storage/storage";
import ShowItems from "../Showitems";
import ReplayIcon from "@material-ui/icons/Replay";
import { getLocalStoreData, localStoreData } from "../../storage/storage";
const Sidebar = ({ crop, history, onChange,screenNum }) => {
  const [iconColor, setIconColor] = useState("sidebar__tool--crop");
  const [iconCrop, setIconCrop] = useState("sidebar__tool--crop");
  const [iconHistory, setIconHistory] = useState("sidebar__tool--history");
  

  const handleClick = selection => {
    switch (selection) {
      case 1:
        setIconCrop("sidebar__tool--active");
        setIconHistory("sidebar__tool--history");
        break;
      case 2:
        setIconCrop("sidebar__tool--crop");
        setIconHistory("sidebar__tool--active");
        break;
    }
  };

    useEffect(()=>{
      const data=getLocalStoreData();
      // console.log(data);
      // console.log(screenNum)
      // const checkData=data[screenNum];
      
      if(data!=null && data[screenNum]){

        onChange('CROP')
        handleClick(1)
      }

   
    },[])
  // const handleClick = (e) => {
  //   setIconColor("sidebar__tool--crop-active")
  // }
  const handleClickHistory = () => {
    onChange();
    
  };

  return (
    <div
      className={classnames({
        sidebar: true,
        ["sidebar--activate"]: crop,
      })}
    >
      <div
        className={classnames({
          sidebar__tool: true,
          [iconCrop]: crop,
        })}
        onClick={() => {
          onChange("CROP");
          handleClick(1);
          
         
        }}
      >
        <CropFreeIcon> </CropFreeIcon>
      </div>
      <div
        className="sidebar__tool sidebar__tool--add-file"
        onClick={() => onChange("ADD_SCREEN")}
      >
        <AddToQueueIcon />
      </div>
      <div
        className={classnames({
          sidebar__tool: true,
          [iconHistory]: crop,
        })}
        onClick={() => {
          handleClickHistory();
          // let res = showItem()
          // console.log(res)
        }}
      >
        <QueryBuilderIcon />
      </div>
  {/* <div
    onClick={e => {
      console.log(e);
      onChange("RELOAD");
    }}
  >
    <ReplayIcon />
  </div> */}
</div>
  );
};
export default Sidebar;
