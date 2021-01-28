import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import Home from "../Home";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const AddSwiper = ({onChange}) => {
    const [state,setState]=useState()
  return (
     <SwiperSlide>
        <Home
          onChange={e=>{
            onChange(true)
            }}
        />
      </SwiperSlide>
  );
};

export default AddSwiper;
