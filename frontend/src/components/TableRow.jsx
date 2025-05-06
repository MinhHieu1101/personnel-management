import React, { useState } from "react";
import AnimatedButton from "./AnimatedButton";
import { DetailModal } from "./DetailModal";
import { AiOutlineUserDelete } from "react-icons/ai";

export const TableRow = ({ id, name, email, role, c_date }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (e, id) => {
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
        <DetailModal />
        <AnimatedButton
          onClick={(e) => handleDelete(e, id)}
          text="Delete"
          icon={AiOutlineUserDelete}
          borderColor="border-rose-500"
          bgColor="bg-rose-500"
          textColor="text-rose-500"
          extra="w-22 h-10 ml-2"
        />
      </td>
    </tr>
  );
};
