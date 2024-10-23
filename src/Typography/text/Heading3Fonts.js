import React from "react";

const Heading3Fonts = ({ text, className, onClick }) => {
  return <p className={`Heading3Fonts ${className}`} onClick={onClick}>{text}</p>;
};

export default Heading3Fonts;
