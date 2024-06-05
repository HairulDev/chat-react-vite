import React from "react";

const Avatar = ({ index, src }) => {
  return (
    <div key={index}>
      <img
        src={src}
        alt="User avatar"
        className="shrink-0 aspect-square w-[40px] rounded-full"
        loading="lazy"
      />
    </div>
  );
};

export default Avatar;
