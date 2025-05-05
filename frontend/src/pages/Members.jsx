import React from "react";
import { TableHead } from "../components/TableHead";
import { TableRow } from "../components/TableRow";

const MemberList = () => {
  return (
    <table className="min-w-7xl divide-y divide-gray-200">
      <TableHead />
      <tbody className="bg-white divide-y divide-gray-200">
        <TableRow
          id="4326634"
          name="Jane Doe"
          email="jane@example.com"
          role="HUMAN"
          c_date="2025-04-29 13:11:24.698 +0700"
        />
        <TableRow
          id="4326634"
          name="Jane Doe"
          email="jane@example.com"
          role="HUMAN"
          c_date="2025-04-29 13:11:24.698 +0700"
        />
      </tbody>
    </table>
  );
};

export default MemberList;
