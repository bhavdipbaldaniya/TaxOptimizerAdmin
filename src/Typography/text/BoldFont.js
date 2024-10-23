import React from "react";

const BoldFont = ({ text, className }) => {
  return <p className={`boldFont ${className}`}>{text}</p>;
};

export default BoldFont;
