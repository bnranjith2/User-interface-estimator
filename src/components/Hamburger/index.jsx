import React from "react";
import "./Hamburger.css";
import Card from '../Card';
import { showData } from "../../storage/storage";
const Hamburger = () => {
    const data = showData()
  return (
    <div>
       <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    </div>

          <ul id="menu">
            {data[1] ? (
              data.map(x => {
                
                return (
                   
                  <img src={x.dataObj.components.screenSrc}/>
                  
                );
              })
            ) : (
                <div>
              
              </div>
            )}
          </ul>
        
    </div>
  );
};

export default Hamburger;
