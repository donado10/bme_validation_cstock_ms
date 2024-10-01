import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateBill } from "../../Store/features/bills";
import { GoAlertFill } from "react-icons/go";
import { FiAlertTriangle } from "react-icons/fi";

export const ConfirmFactModal: React.FC<{
  billDetail: { piece: string; date: string };
  closeModal: () => void;
}> = ({ billDetail, closeModal }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex h-[15rem] w-[45rem] flex-col gap-4 overflow-hidden rounded-lg bg-white">
      <div className="h-3 w-full bg-bme-bg"></div>
      <div className="flex w-full items-center gap-16 border-b-2 border-b-gray-500 p-8">
        <div>
          <GoAlertFill className="h-16 w-16 text-bme-bg" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium text-black">
            Vouler vous confirmer la facture{" "}
            <span className="text-md font-bold text-bme-bg">
              {billDetail.piece}
            </span>{" "}
            ?
          </h1>
          <h2 className="text-xs">
            La validation est définitive au niveau de cette application. Si vous
            revenez en arrière, cette action devra être effectuée dans
            l'application de gestion commerciale.
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 p-2">
        <button
          onClick={() => {
            closeModal();
          }}
          className="rounded-lg border-2 bg-red-500 px-4 py-1 text-white"
        >
          <span>Annuler</span>
        </button>

        <button
          onClick={() => {
            let ref = "";

            if (billDetail.piece.search("LGFV")) {
              console.log(billDetail.piece.includes("LGFV"));
              console.log("L");
              ref = "VENTES LP";
            }
            if (billDetail.piece.includes("RFV")) {
              console.log("R");
              ref = "VENTES RB";
            }
            if (billDetail.piece.includes("IFV")) {
              console.log("I");
              ref = "VENTES INTENDANCE";
            }

            fetch("http://bme_api.test:8080/api/execute-stock-procedure", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ref: ref,
                date: billDetail.date,
                piece: billDetail.piece,
              }), // Convert the request payload to JSON string
            })
              .then((response) => response.json()) // Parse the JSON response
              .then((data) => {
                dispatch(validateBill(billDetail.piece));
                closeModal();
                console.log(data);
              }) // Handle the response
              .catch((error) => console.error("Error:", error)); // Handle any errors
          }}
          className="rounded-lg border-2 border-bme-bg px-4 py-1 text-bme-bg hover:bg-bme-bg hover:text-white"
        >
          <span>Confirmer</span>
        </button>
      </div>
    </div>
  );
};
export const CancelFactModal = () => {
  const location = useLocation();
  const billQueryValue = location.search.split("=")[1];

  useEffect(() => {
    console.log(billQueryValue);
  }, []);
  return (
    <div className="flex h-[15rem] w-[25rem] flex-col items-center justify-center gap-4 bg-white">
      <h1 className="f">Vouler vous annuler la facture ?</h1>

      <div className="flex items-center gap-4">
        <button className="border-2 border-black px-4 py-1">
          <span>Oui</span>
        </button>
        <button className="border-2 border-black px-4 py-1">
          <span>Non</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmFactModal;
