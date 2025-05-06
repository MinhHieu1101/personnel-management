import React from "react";
import { FaArrowRight } from "react-icons/fa";

export const CustomCard = ({ id, name, number }) => {
  return (
    <div className="hover:fill-slate-700 hover:drop-shadow-lg hover:drop-shadow-slate-500/50 flex flex-col justify-center w-sm">
      <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3 bg-gray-50">
        <div>
          <h4 className="font-bold text-2xl leading-tight">{name}</h4>
          <div className="my-4">
            <p>ID: {id}</p>
            <p>{number} people</p>
          </div>
        </div>
        <div>
          <a
            className="hover:fill-emerald-700 hover:drop-shadow-lg hover:drop-shadow-emerald-500/50 mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-gray-700 active:ring-0 active:ring-offset-0 leading-normal bg-link text-gray-700 hover:bg-opacity-80 text-base rounded-lg py-1.5"
            aria-label="Quick Start"
            target="_self"
            href="/learn"
          >
            View <FaArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};
