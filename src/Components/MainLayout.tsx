import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="shadow-main m-14 rounded-xl bg-white">
      <Outlet />
    </main>
  );
};

export default MainLayout;
