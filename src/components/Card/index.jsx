import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import "./card.css";

// const defaultProps = {
//     card: ""
// };

// const propTypes = {
//     className: PropTypes.string,
//     componentname:PropTypes.string.isRequired,
//     time:PropTypes.string.isRequired,
//     timeunit:PropTypes.string.isRequired
// };

const Card = ({ className, name, estTime, estUnit, imgsrc }) => {
  // console.log(imgsrc);
  const returnItems = () => {
    return (
      <section className={classnames({ card: true, [className]: className })}>
        <div className="card__image-wrapper">
          <img src={imgsrc} className="card__image-wrapper__img" />
        </div>
        <div className="card__content-wrapper">
          <div>Name: {name}</div>
          <div>Time assigned: {estTime}</div>
          <div>Time Unit: {estUnit}</div>
        </div>
      
      </section>
    );
  };

  const error = () => {
    return (
      <section className={classnames({ card: true, [className]: className })}>
        <div className="error-message">No Components are Cropped</div>
      </section>
    );
  };

  return <div>{name == "" ? error() : returnItems()}</div>;
};

// Card.defaultProps = defaultProps;
// Card.propTypes = propTypes;
export default Card;
