import { MainLayout, Layout } from "../Components/MainLayout";
import Bill from "../Pages/Bill";
import Intendance, { intendanceLoader } from "../Pages/Intendance";
import Laprine, { laprineLoader } from "../Pages/Laprine";
import RBrun, { rbrunLoader } from "../Pages/RBrun";

const route_warehouse = [
  {
    path: "/validation/sortie",
    element: <MainLayout />,
    children: [
      {
        path: "intendance",
        element: <Layout />,
        id: "intendance-id",
        loader: intendanceLoader,
        children: [
          {
            index: true,
            element: <Intendance />,
            path: "",
          },
          {
            element: <Bill />,
            path: ":billID",
          },
        ],
      },
      {
        path: "laprine",
        element: <Laprine />,
        id: "laprine-id",
        loader: laprineLoader,
      },
      {
        path: "rbrun",
        element: <RBrun />,
        id: "rbrun-id",
        loader: rbrunLoader,
      },
    ],
  },
];

export default route_warehouse;
