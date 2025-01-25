import Achat from "../Pages/Achat/Achat";
import AchatLayout from "../Pages/Achat/AchatLayout";
import MainLayout from "../Pages/MainLayout";
import Retour from "../Pages/Retour/Retour";
import RetourLayout from "../Pages/Retour/RetourLayout";
import Transfert from "../Pages/Transfert/Transfert";
import TransfertLayout from "../Pages/Transfert/TransfertLayout";
import Validation from "../Pages/Validation/Validation";
import ValidationLayout from "../Pages/Validation/ValidationLayout";

const route_warehouse = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/validation",
        element: <ValidationLayout />,
        children: [
          {
            path: "intendance",
            element: <Validation title="Intendance" souche="IFV" />,
            id: "intendance-id",
          },
          {
            path: "laprine",
            element: <Validation title="Laprine" souche="LGV" />,
            id: "laprine-id",
          },
          {
            path: "rbrun",
            element: <Validation title="Robert Brun" souche="RFV" />,
            id: "rbrun-id",
          },
        ],
      },
      {
        path: "/transfert",
        element: <TransfertLayout />,
        children: [{ path: "", element: <Transfert /> }],
      },
      {
        path: "/retour",
        element: <RetourLayout />,
        children: [{ path: "", element: <Retour /> }],
      },
      {
        path: "/achat",
        element: <AchatLayout />,
        children: [{ path: "", element: <Achat title="Achat" souche="" /> }],
      },
    ],
  },
];

export default route_warehouse;
