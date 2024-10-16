import MainLayout from "../Components/MainLayout";
import { intendanceLoader } from "../Pages/Intendance";
import { laprineLoader } from "../Pages/Laprine";
import { rbrunLoader } from "../Pages/RBrun";
import Validation from "../Pages/Validation";

const route_warehouse = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/intendance",
        element: (
          <Validation
            title="Intendance"
            souche="IFV"
            loaderID="intendance-id"
          />
        ),
        id: "intendance-id",
        loader: intendanceLoader,
      },
      {
        path: "/laprine",
        element: (
          <Validation title="Laprine" souche="LGV" loaderID="laprine-id" />
        ),
        id: "laprine-id",
        loader: laprineLoader,
      },
      {
        path: "/rbrun",
        element: (
          <Validation title="Robert Brun" souche="RFV" loaderID="rbrun-id" />
        ),
        id: "rbrun-id",
        loader: rbrunLoader,
      },
    ],
  },
];

export default route_warehouse;
