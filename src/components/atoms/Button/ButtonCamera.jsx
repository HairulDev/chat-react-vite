import React from "react";

const ButtonCamera = ({ src, onClick }) => {
  return <img src={src} alt="Send button" loading="lazy" onClick={onClick} />;
};

export default ButtonCamera;
