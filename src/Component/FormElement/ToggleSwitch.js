import React, { useState } from "react";
import style from "./form.module.css";

const ToggleSwitch = ({
  options = ["No", "Yes"],
  defaultOption = "Yes",
  onChange,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleToggle = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={style.container}>
      {options.map((option) => (
        <div
          key={option}
          // className={`${style.option} ${selectedOption === option ? style.selected : ""
          //   } ${className}`}
          className={`${style.option} ${
            selectedOption === option
              ? option === "Yes"
                ? style.selectedYes
                : style.selectedNo
              : ""
          } ${className}`}
          onClick={() => handleToggle(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ToggleSwitch;
