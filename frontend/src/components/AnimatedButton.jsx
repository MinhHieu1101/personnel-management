import React from "react";

const AnimatedButton = ({
  onClick,
  text,
  icon: Icon,
  borderColor,
  bgColor,
  textColor,
  extra
}) => {
  return (
    <button
      className={`${extra} px-4 py-2 relative inline-flex items-center justify-center overflow-hidden font-medium transition duration-300 ease-out border-2 ${borderColor} rounded-lg shadow-md group`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center w-full h-full dark:text-slate-900 text-white duration-300 -translate-x-full ${bgColor} group-hover:translate-x-0 ease`}
      >
        <Icon className="w-8 h-8" />
      </span>
      <span
        className={`absolute flex items-center text-xs sm:text-base font-semibold justify-center ${textColor} transition-all duration-300 transform group-hover:translate-x-full ease`}
      >
        {text}
      </span>
      {/* affect the size of the button */}
      <span className="relative text-base font-semibold invisible">
        Stay Humble
      </span>
    </button>
  );
};

export default AnimatedButton;
