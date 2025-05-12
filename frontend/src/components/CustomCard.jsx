import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeamRequest } from "../redux/actions/teamActions";
import AnimatedButton from "./AnimatedButton";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineGroupOff } from "react-icons/md";

export const CustomCard = ({ id, name, number, onView }) => {
  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    e.preventDefault();

    setTimeout(() => {
      const deleteConfirm = window.confirm(
        `Are you sure you want to delete this team ${name} ?`
      );
      if (deleteConfirm) {
        dispatch(deleteTeamRequest(id));
      }
    }, 0);
  };

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
        <div className="flex items-center justify-center space-x-4 mt-4">
          <AnimatedButton
            onClick={onView}
            text="View"
            icon={RiTeamLine}
            borderColor="border-emerald-600"
            bgColor="bg-emerald-600"
            textColor="text-emerald-600"
            extra="w-22 h-10"
          />
          <AnimatedButton
            onClick={(e) => handleDelete(e, id)}
            text="Delete"
            icon={MdOutlineGroupOff}
            borderColor="border-rose-600"
            bgColor="bg-rose-600"
            textColor="text-rose-600"
            extra="w-22 h-10"
          />
        </div>
      </div>
    </div>
  );
};
