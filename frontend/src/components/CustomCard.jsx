import React from "react";
import AnimatedButton from "./AnimatedButton";
import { RiTeamLine } from "react-icons/ri";

export const CustomCard = ({ id, name, number, onView }) => {
  return (
    <div className="hover:fill-slate-700 hover:drop-shadow-lg hover:drop-shadow-slate-500/50 flex flex-col justify-center w-sm">
      <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-8 mr-10 mt-3 bg-gray-50">
        <div>
          <h4 className="hover:fill-emerald-700 hover:drop-shadow-lg hover:drop-shadow-emerald-500/50 font-bold text-2xl leading-tight">
            {name}
          </h4>
          <div className="my-4">
            <p>ID: {id}</p>
            <p>{number} people</p>
          </div>
        </div>
        <AnimatedButton
          onClick={onView}
          text="View"
          icon={RiTeamLine}
          borderColor="border-emerald-600"
          bgColor="bg-emerald-600"
          textColor="text-emerald-600"
          extra="w-22 h-10"
        />
      </div>
    </div>
  );
};
