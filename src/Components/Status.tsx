import React from "react";

const Status: React.FC<{ status: boolean }> = ({ status }) => {
  if (!status) {
    return (
      <div className="flex items-center gap-4 pl-3">
        <div className="h-3 w-3 rounded-full bg-red-600"></div>
        <h2>Invalide</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 pl-3">
      <div className="h-3 w-3 rounded-full bg-green-600"></div>
      <h2>A jour</h2>
    </div>
  );
};

export default Status;
