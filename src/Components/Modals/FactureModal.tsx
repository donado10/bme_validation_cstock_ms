import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateBill } from "../../Store/features/bills";
import { GoAlertFill } from "react-icons/go";
import { FiAlertTriangle } from "react-icons/fi";

export const ConfirmFactModal: React.FC<{
  bill: string;
  closeModal: () => void;
}> = ({ bill, closeModal }) => {
  const location = useLocation();
  const billQueryValue = location.search.split("=")[1];
  const dispatch = useDispatch();

  return (
    <div className="flex h-[15rem] w-[45rem] flex-col gap-4 overflow-hidden rounded-lg bg-white">
      <div className="h-3 w-full bg-bme-800"></div>
      <div className="flex w-full items-center gap-16 border-b-2 border-b-gray-500 p-8">
        <div>
          <GoAlertFill className="h-16 w-16 text-bme-800" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Etes vous sure ?</h1>
          <h2>
            Vouler vous confirmer la facture{" "}
            <span className="text-md font-bold">{bill}</span> ?
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 p-2">
        <button
          onClick={() => {
            dispatch(validateBill(bill));
            closeModal();
          }}
          className="border-2 border-black px-4 py-1"
        >
          <span>Oui</span>
        </button>
        <button
          onClick={() => {
            closeModal();
          }}
          className="border-2 border-black px-4 py-1"
        >
          <span>Non</span>
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
