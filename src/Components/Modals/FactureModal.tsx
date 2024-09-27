import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateBill } from "../../Store/features/bills";

export const ConfirmFactModal: React.FC<{
  bill: string;
  closeModal: () => void;
}> = ({ bill, closeModal }) => {
  const location = useLocation();
  const billQueryValue = location.search.split("=")[1];
  const dispatch = useDispatch();

  return (
    <div className="flex h-[15rem] w-[25rem] flex-col items-center justify-center gap-4 bg-white">
      <h1 className="f">
        Vouler vous confirmer la facture{" "}
        <span className="text-xl font-bold">{bill}</span> ?
      </h1>

      <div className="flex items-center gap-4">
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
