import React from "react";

export const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          Role
        </th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          Created Date
        </th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
  );
};
