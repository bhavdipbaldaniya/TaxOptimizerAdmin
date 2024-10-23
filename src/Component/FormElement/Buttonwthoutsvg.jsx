import React from "react";
import style from './form.module.css'

const Buttonwthoutsvg = ({ onClick, disabled, type, text, className, svg }) => {
    return (
        <button
            className={`${className} ${style.defult_button}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            <span>{text}</span>
        </button>
    );
};

export default Buttonwthoutsvg;
