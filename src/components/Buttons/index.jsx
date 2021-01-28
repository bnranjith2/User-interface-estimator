import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const defaultProps = {
  className: "",
  onClick: () => {}
};

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

const Button = ({className, label, onClick }) => {
  return (
    <button
      className={classnames({
        button: true,
        [className]: className
      })}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
export default Button;
