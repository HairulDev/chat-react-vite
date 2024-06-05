import React from "react";

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-1 rounded-lg shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          Close
        </button>
        {/* Isi modal */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
