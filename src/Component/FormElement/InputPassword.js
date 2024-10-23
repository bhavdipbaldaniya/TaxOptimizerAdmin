import React, { useState } from "react";
import style from "./form.module.css";
import { ic_Password, ic_PasswordOff } from "@/src/Utils/svg";

const InputPassword = ({
  placeholder,
  value,
  setValue,
  name,
  onBlur,
  disable,
  className,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div className={style.inputWrapper}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          className={`${style.input} noSpinner ${className}`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
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
        <span
          onClick={togglePasswordVisibility}
          className={style.togglePassword}
        >
          {isPasswordVisible ? ic_Password.icon() : ic_PasswordOff.icon()}
        </span>
      </div>
    </>
  );
};

export default InputPassword;
