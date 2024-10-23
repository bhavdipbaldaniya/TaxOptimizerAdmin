import React from "react";
import style from './form.module.css'

const Button = ({ onClick, disabled, type, text, className, svg }) => {
    return (
        <button
            className={`${className} ${style.defult_button}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            <div className={style.ButtonIcon}>
                <span> {svg}</span>
                <span>{text}</span>
            </div>
        </button>
    );
};

export default Button;
