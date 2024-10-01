import MainLayout from "../Components/MainLayout";
import Intendance, { intendanceLoader } from "../Pages/Intendance";
import Laprine, { laprineLoader } from "../Pages/Laprine";
import RBrun, { rbrunLoader } from "../Pages/RBrun";

const route_warehouse = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/intendance",
        element: <Intendance />,
        id: "intendance-id",
        loader: intendanceLoader,
      },
      {
        path: "/laprine",
        element: <Laprine />,
        id: "laprine-id",
        loader: rbrunLoader,
      },
      {
        path: "/rbrun",
        element: <RBrun />,
        id: "rbrun-id",
        loader: laprineLoader,
      },
    ],
  },
];

export default route_warehouse;
