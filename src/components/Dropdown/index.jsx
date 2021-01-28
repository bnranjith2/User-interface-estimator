import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./dropdown.css";

const defaultProps = {
    options: [],
    onChange: () => { },
    value: "",
    className: ""
};

const propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

const Dropdown = ({ value, options, onChange, className }) => {
    const [option, setOption] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const closeList = () => {
        setIsOpen(!isOpen);
    };

    const listSetitem = item => {
        setOption(item);
        setIsOpen(false);
        onChange(item);
    };

    return (
        <div
            className={classnames({ dropdown: true, [className]: className })}
            onClick={() => closeList()}
        >
            <div className="dropdown__header" onClick={() => closeList()}>
                <input
                    className="dropdown__header__input"
                    type="text"
                    value={option}
                    placeholder={value}
                    disabled
                />

                <div className="dropdown__header__arrow-down" />
            </div>

            {isOpen && (
                <div className="dropdown__list">
                    {options.map((item, index) => (
                        <li
                            className={
                                option === item.name
                                    ? "dropdown__list__item dropdown__list__item--active"
                                    : "dropdown__list__item dropdown__list__item--inactive"
                            }
                            key={index}
                            onClick={() => {
                                listSetitem(item.name);
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                    {options.length == 0 && (
                        <div className="dropdown__list__empty">
                            No items to be displayed
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
// }

Dropdown.defaultProps = defaultProps;
Dropdown.propTypes = propTypes;
export default Dropdown;
