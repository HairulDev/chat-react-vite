import React from "react";

function Connect({ iconSrc, linkUrl }) {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <img
        loading="lazy"
        src={iconSrc}
        className="shrink-0 w-6 aspect-square"
        alt="Connect with Facebook"
      />
    </a>
  );
}

export default Connect;
