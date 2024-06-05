import React from "react";
import Button from "../Button";

function HeaderWithButton({
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onClickButton,
  titleIsFlex,
}) {
  return (
    <header className="flex justify-between px-5 mt-8">
      <div className={titleIsFlex ? "flex gap-2 my-auto" : "leading-[150%]"}>
        <div className="text-base font-medium text-black">{title}</div>
        <p className="text-2xl font-bold capitalize text-sky-950">{subtitle}</p>
      </div>
      <Button
        outlined="outlined"
        rounded="rounded-[57px]"
        iconSrc={buttonIcon}
        onClick={onClickButton}
      >
        {buttonText}
      </Button>
    </header>
  );
}

export default HeaderWithButton;
