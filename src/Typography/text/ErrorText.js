import React from "react";

const ErrorText = ({ text, className }) => {
  return <p className={`ErrorText ${className}`}>{text}</p>;
};

export default ErrorText;
