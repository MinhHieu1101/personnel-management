import React from "react";
import { UserCompositionModal } from "./UserCompositionModal";
import { RiTeamLine } from "react-icons/ri";

export const CustomCard = ({ id, name, number }) => {
  return (
    <div className="hover:fill-slate-700 hover:drop-shadow-lg hover:drop-shadow-slate-500/50 flex flex-col justify-center w-sm">
      <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3 bg-gray-50">
        <div>
          <h4 className="hover:fill-emerald-700 hover:drop-shadow-lg hover:drop-shadow-emerald-500/50 font-bold text-2xl leading-tight">
            {name}
          </h4>
          <div className="my-4">
            <p>ID: {id}</p>
            <p>{number} people</p>
          </div>
        </div>
        <UserCompositionModal
          title="Team Composition"
          buttonIcon={RiTeamLine}
          icon="Mngr."
          heading1="Managers"
          node="John Doe"
          subnode="Founder & CEO"
          icon2="Mbr."
          heading2="Members"
          node2="Alice Johnson"
          subnode2="HR Manager"
          extra={true}
        />
      </div>
    </div>
  );
};
