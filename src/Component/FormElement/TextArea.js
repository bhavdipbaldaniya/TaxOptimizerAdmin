import React from "react";
import Style from "./form.module.css";
import { ic_Password_Open } from "@/src/Utils/svg";

const TextArea = ({
  placeholder,
  value,
  setValue,
  name,
  onBlur,
  disable,
  className,
  type,
  onChange,
}) => {
  return (
    <>
      <textarea
        type={type}
        className={`${Style.TextArea} ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disable}
        autoComplete="off"
      />
    </>
  );
};

export default TextArea;
