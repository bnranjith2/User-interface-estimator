import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import "./input.css";

const defaultProps = {
  className: "",
  placeholder: "",
  type: "text"
};

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number
};

const Input = ({ className, value, onChange, placeholder, type, min, max, maxlength, minlength }) => {
  return (
    <input
      type={type}
      className={classnames({
        'input': true,
        [className]: className
      })}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      min = {min}
      max = {max}
      maxLength = {maxlength}
      minLength = {minlength}
    />
  );
};

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;
export default Input;
