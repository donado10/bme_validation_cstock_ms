import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <main className="shadow-main m-14 rounded-xl bg-white">
      <Outlet />
    </main>
  );
};

export const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
