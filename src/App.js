import React from "react";
import "./style.css";
import Examplecontainer from "./containers/Examplecontainer";
import Home from './components/Home';
import Addcomponent from "./components/Addcomponent";
import Example from './components/Swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import Swipe from "./components/Swiper";
import ShowItems from "./components/Showitems";
import {addScreen} from './storage/storage'

export default function App() {

  return (
    <div>
    <Swipe/>
    
    </div>
  );
}
