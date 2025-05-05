import React from "react";
/* import { useDispatch } from "react-redux";
import { clearMessage } from "../slices/message.js"; */

const LeftOverlayContent = ({ isAnimated, setIsAnimated }) => {
  //const dispatch = useDispatch();
  const handleToggleAnimation = (e) => {
    setIsAnimated(!isAnimated);
    //dispatch(clearMessage());
  };
  return (
    <div className="py-8 text-center px-2 md:px-8">
      <h1 className="md:text-3xl lg:text-5xl text-base font-bold text-white mb-4">
        Already have an account ?
      </h1>

      <h5 className="md:text-base text-sm text-white">
        Sign in with your email & password
      </h5>
      <div className="mt-16">
        <button
          className="md:py-3 md:px-6 py-2 px-4 bg-transparent rounded-full text-center text-white text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
          onClick={handleToggleAnimation}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
