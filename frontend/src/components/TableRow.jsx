import React from "react";
import AnimatedButton from "./AnimatedButton";
import { BiSolidUserDetail } from "react-icons/bi";

export const TableRow = ({ id, name, email, role, c_date, onView }) => {
  const handleAddMember = (e, id) => {
    e.preventDefault();
    console.log(`Hello ${id}`);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{role}</td>
      <td className="px-6 py-4 whitespace-nowrap">{c_date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <AnimatedButton
          onClick={onView}
          text="View"
          icon={BiSolidUserDetail}
          borderColor="border-emerald-600"
          bgColor="bg-emerald-600"
          textColor="text-emerald-600"
          extra="w-22 h-10"
        />
      </td>
    </tr>
  );
};
