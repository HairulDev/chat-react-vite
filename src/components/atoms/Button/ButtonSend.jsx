import React from "react";

const ButtonSend = ({ src, onClick }) => {
  return (
    <img
      src={src}
      alt="Send icon"
      className="shrink-0 w-10 aspect-square"
      loading="lazy"
      onClick={onClick}
    />
  );
};

export default ButtonSend;
