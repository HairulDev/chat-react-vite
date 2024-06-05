import React from "react";

const ButtonEdit = ({ onClick }) => (
  <button onClick={onClick}>
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          opacity="0.1"
          d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
          fill="#d1d1d1"
        ></path>{" "}
        <path
          d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
          stroke="#d1d1d1"
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M8 12H8.01"
          stroke="#d1d1d1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M12 12H12.01"
          stroke="#d1d1d1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M16 12H16.01"
          stroke="#d1d1d1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  </button>
);

export default ButtonEdit;
