import React,{useState} from "react";
import ShowItems from "../Showitems";
import "./viewtabs.css";
import { showData } from "../../storage/storage";
import Button from "../Buttons";
import CloseIcon from "@material-ui/icons/Close";
import classnames from "classnames";
const ViewTabs = ({onChange}) => {
  const [openViewTabs, setOpenViewTabs] = useState(true);


  const data = showData();
  // console.log("op"+openViewTabs);
  const handleClick=()=>{
return <ShowItems className={"showitemscontainer__item-wrapper--cropped-img"} flag={true}/>

  }
  return (
<div>
    {openViewTabs?(<ShowItems onChange={()=>{
      setOpenViewTabs(false);
      onChange();
    }} title={"Screen Tabs"} className="showitemscontainer--tabs">
  
   </ShowItems>):""}
   </div>
   
  );
};

export default ViewTabs;
