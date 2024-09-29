import React from "react";
import { EFilterBills } from "../Hooks/UseFilterData";

const Status: React.FC<{ status: boolean }> = ({ status }) => {
  if (!status) {
    return (
      <div className="flex items-center gap-4 pl-8">
        <div className="aspect-square w-2 rounded-full bg-red-600"></div>
        <h2>Non Validée</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 pl-8">
      <div className="aspect-square w-2 rounded-full bg-green-600"></div>
      <h2>Validée</h2>
    </div>
  );
};

export default Status;
