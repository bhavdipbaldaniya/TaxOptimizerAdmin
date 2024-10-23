import React from "react";
import Style from "./form.module.css";
const InputSearch = ({
    value,
    setValue,
    name,
    onBlur,
    disable,
    className,
}) => {
    return (
        <>
            <input
                type='search'
                className={`${Style.InputSearch} ${className}`}
                placeholder='Search'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

        </>
    );
};

export default InputSearch;
