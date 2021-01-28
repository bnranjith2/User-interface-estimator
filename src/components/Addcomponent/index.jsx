import React, { useState } from "react";
import classnames from "classnames";
import "./addcomponent.css";
import Input from "../Input";
import Button from "../Buttons";
import { DropdownData } from "../../constants/data";
import Dropdown from "../Dropdown";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Addcomponent = ({ onChange, data }) => {
  debugger;
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("");

  const [modalClass, setModalClass] = useState("");

  const [countName, setcountName] = useState(0);
  const [countTime, setCountTime] = useState(0);
  const [display, setDisplay] = useState("none");
  const [title, setTitle] = useState("");

  let count = 0;

  const increment = (e, id) => {
    switch (id) {
      case 1:
        count = 30 - e.target.value.length;
        setcountName(count);
        break;
      case 2:
        count = 5 - e.target.value.length;
        setCountTime(count);
        break;
    }
  };

  const closeModal = () => {
    setModalClass("addcomponent--closemodal");
    onChange("CLOSE");
  };

  const handleOnClickSave = () => {
    debugger;
    if(data.payload!=""){
      onChange({value:data.payload, name:data.payload.name, timeUnit:data.payload.estUnit, time:data.payload.estTime });
      closeModal();
      setDisplay("none");
    }else if (name.length && time.length && title != "") {
      debugger;
      onChange({ name: name, timeUnit: title, time: time });
      closeModal();
      setDisplay("none");
    } else {
      setDisplay("flex");
    }
  };

  return (
    <div
      className={classnames({
        addcomponent: true,
        [modalClass]: true,
      })}
    >
      <Button label={"X"} className="button--close" onClick={closeModal} />
      <header className="addcomponent__header">Component</header>
      <div className="addcomponent__input">
        <div className="addcomponent__input__name">
          Name
          <Input
            value={data.payload ? data.payload.name : name}
            onChange={e => {
            
              data.payload?data.payload.name = e.target.value:setName(e.target.value);
              increment(e, 1);
            }}
            minlength={1}
            maxlength={30}
          />
          <p className="addcomponent__input__counter">{countName}/30</p>
        </div>
        <div className="addcomponent__input__time">
          Estimated time for development
          <Input
            type={"number"}
            minlength={1}
            maxlength={5}
            value={data.payload ? data.payload.estTime : time}
            onChange={e => {
              data.payload?data.payload.estTime = e.target.value:setTime(e.target.value);
              increment(e, 2);
            }}
          ></Input>
          <p className="addcomponent__input__counter">{countTime}/5</p>
        </div>
        <div className="addcomponent__input__time-unit">
          Estimated time unit for development
        </div>
        <Dropdown
          value={data.payload ? data.payload.estUnit : "Select catogery"}
          options={DropdownData.Timeunit}
          onChange={e => {
            data.payload?data.payload.estUnit= e:setTitle(e);
          }}
        />
      </div>

      <div className="alert-message" style={{ display: `${display}` }}>
        <div className="alert-message__icon">
          <ErrorOutlineIcon />
        </div>
        <div className="alert-message__text">Fill All The Required Fields.</div>
      </div>
      <Button
        label={"Save"}
        className="button--save"
        onClick={handleOnClickSave}
      />
    </div>
  );
};

export default Addcomponent;
