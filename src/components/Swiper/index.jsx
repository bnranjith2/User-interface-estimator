import React, { Component, useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import uuid from "react-uuid";
// import "swiper/swiper.scss";
// import "swiper/swiper.scss";
// import "swiper/components/navigation/navigation.scss";
// import "swiper/components/pagination/pagination.scss";
// import "swiper/components/scrollbar/scrollbar.scss";
import "./swiper.css";
import Home from "../Home";
import AddSwiper from "../AddSwiper";
import { addScreen, showItem, addComponent } from "../../storage/storage";
import ShowItems from "../Showitems";
import Hamburger from "../Hamburger";
import MenuIcon from "@material-ui/icons/Menu";
import ViewTabs from "../ViewTabs";
import { getLocalStoreData } from "../../storage/storage";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const Swipe = () => {
  const [screenCount, setScreenCount] = useState(0);
  const [screens, setScreens] = useState([{ name: "firstscreen" }]);
  const [history, setHistory] = useState(false);
  const [screenNum, setScreenNum] = useState(1);
  const [viewTabs, setViewTabs] = useState(false);
  // const [outLineData, setOutLineData] = useState();
  const [currentScreenNum, setCurrentScreenNum] = useState();

  const [screenData, setScreenData] = useState([]);

  useEffect(() => {
    if (getLocalStoreData()) {
      const getLocalStroageData = getLocalStoreData();
      const totalScreenNumber = [];
      getLocalStroageData.map(item => {
        totalScreenNumber.push({ name: Object.keys(item) });
      });
      setScreens(totalScreenNumber);
    }
    if (screenData.length) {
      addScreen(screenData);
    }
  }, [screenData]);
  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        allowTouchMove={false}
        pagination={{ clickable: true }}
        onSlideChange={e => {}}
        slot="container-start"
      >
        {screens.map((screen, index) => (
        
          <SwiperSlide slot="container-start">
            <Home
              screen={screen}
              
              screenNum={index}
              onChange={e => {
                setScreens([{ name: "newscreen" }, ...screens]);
                
                debugger;
              }}
            ></Home>
          </SwiperSlide>
        ))}
      </Swiper>

      {screens.length > 1 ? (
        <div
          className="home__table-list"
          onClick={() => {
            setViewTabs(true);
          }}
        >
          <MenuIcon />
        </div>
      ) : (
        ""
      )}

      {viewTabs ? (
        <ViewTabs
        
          flag={true}
          onChange={() => {
            setViewTabs(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Swipe;
