import React from "react";
import Style from "./form.module.css";

const InputNumLimit = ({
  placeholder,
  value,
  onChange,
  name,
  onBlur,
  disable,
  className,
  maxValue,
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue <= maxValue) {
      onChange(e);
    }
  };
  return (
    <input
      max={maxValue}
      type="number"
      className={`${Style.input} noSpinner`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={disable}
      onWheel={(e) => e.target.blur()}
      autoComplete="off"
      onKeyDown={(e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
        }
      }}
    />
  );
};

export default InputNumLimit;
