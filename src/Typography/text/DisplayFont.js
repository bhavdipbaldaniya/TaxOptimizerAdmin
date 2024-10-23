import React from "react";

const DisplayFont = ({ text, className }) => {
  return <p className={`DisplayFont ${className}`}>{text}</p>;
};

export default DisplayFont;
