import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import LeftOverlayContent from "../components/LeftOverlayContent";
import RightOverlayContent from "../components/RightOverlayContent";

const Authentication = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <>
      <div className="sm:h-[75%] h-[60%] landscape:md:h-[60%] landscape:lg:h-[75%] w-5/6 mt-10 bg-white dark:bg-slate-900 relative overflow-hidden rounded-lg">
        <div
          id="signin"
          className={`portrait:border portrait:rounded-xl portrait:sm:border-0 portrait:sm:rounded-none dark:bg-slate-900 absolute portrait:-translate-x-0 portrait:sm:z-0 portrait:opacity-100 portrait:sm:opacity-0 top-0 left-0 portrait:h-1/2 portrait:w-full portrait:sm:h-full portrait:sm:w-1/2 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 overflow-y-auto ${
            isAnimated
              ? "translate-x-full opacity-0"
              : "portrait:opacity-100 portrait:sm:opacity-100 portrait:sm:z-50"
          }`}
        >
          <SigninForm />
        </div>

        <div
          id="signup"
          className={`portrait:border portrait:rounded-xl portrait:sm:border-0 portrait:sm:rounded-none absolute portrait:-translate-x-0 portrait:opacity-100 portrait:sm:opacity-0 portrait:sm:z-0 portrait:top-1/2 portrait:sm:top-0 top-0 left-0 portrait:h-1/2 portrait:w-full portrait:sm:h-full portrait:sm:w-1/2 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out overflow-y-auto ${
            isAnimated
              ? "translate-x-full opacity-100 z-50 animate-show portrait:opacity-100 portrait:sm:opacity-100 portrait:sm:z-50 portrait:sm:translate-x-full"
              : "opacity-0 z-10"
          }`}
        >
          <div className="h-full w-full flex justify-center items-center md:mx-auto ml-8">
            <SignupForm />
          </div>
        </div>

        <div
          id="overlay-container"
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition duration-700 ease-in-out z-100 ${
            isAnimated
              ? "-translate-x-full portrait:opacity-0 portrait:sm:opacity-100"
              : "portrait:opacity-0 portrait:sm:opacity-100"
          }`}
        >
          <div
            id="overlay"
            className={`relative -left-full h-full w-[200%] transform transition duration-700 ease-in-out ${
              isAnimated ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              id="overlay-left"
              className={`[background:radial-gradient(125%_125%_at_50%_90%,#0a0d0b_40%,#25f547_100%)] w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%] transition duration-700 ease-in-out overflow-y-auto lg:overflow-hidden ${
                isAnimated ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            >
              <LeftOverlayContent
                isAnimated={isAnimated}
                setIsAnimated={setIsAnimated}
              />
            </div>
            <div
              id="overlay-right"
              className={`[background:radial-gradient(125%_125%_at_50%_10%,#0a0d0b_40%,#25f547_100%)] w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition duration-700 ease-in-out overflow-y-auto lg:overflow-hidden ${
                isAnimated ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <RightOverlayContent
                isAnimated={isAnimated}
                setIsAnimated={setIsAnimated}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
