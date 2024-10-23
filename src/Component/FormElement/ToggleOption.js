"use client"
import React, { useState } from "react";
import style from "./form.module.css";

const ToggleOption = ({
  options = [
    { label: "Value", value: "value" },
    { label: "%", value: "%" },
  ],
  defaultOption = "value",
  onChange,name ="type" 
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleOptionChange = (optionValue) => {
    setSelectedOption(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={style.containerRadio}>
      {options.map((option) => (
        <div key={option.value} className={style.optionContainer}>
          <input
            className={style.InputRedioColor}
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleOptionChange(option.value)}
          />
          <span className={style.option_text}>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ToggleOption;
