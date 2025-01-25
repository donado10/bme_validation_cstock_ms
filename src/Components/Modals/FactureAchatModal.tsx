import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBillState, validateBill } from "../../Store/features/bills";
import { GoAlertFill } from "react-icons/go";
import { PiSpinnerBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { IRootState } from "../../Store/store";
import { useInterval } from "../../Hooks/use-interval";

const BillAlert: React.FC<{
  billDetail: { piece: string; date: string };
  closeModal: () => void;
  setEnableLoader: React.Dispatch<boolean>;
  setIsFactureValid: React.Dispatch<boolean>;
}> = ({ billDetail, closeModal, setEnableLoader, setIsFactureValid }) => {
  return (
    <>
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
            setEnableLoader(true);
            fetch("http://bme_api.test:8082/api/executeACProcedure", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date: billDetail.date,
                piece: billDetail.piece,
              }),
            })
              .then((response) => {
                if (response.status !== 200) {
                  setEnableLoader(false);
                  throw Error();
                }
                return response.json();
              }) // Parse the JSON response
              .then(() => {
                setEnableLoader(false);
                setIsFactureValid(true);
              }) // Handle the response
              .catch((error) => console.error("Error:", error)); // Handle any errors
          }}
          className="rounded-lg border-2 border-bme-bg px-4 py-1 text-bme-bg hover:bg-bme-bg hover:text-white"
        >
          <span>Confirmer</span>
        </button>
      </div>
    </>
  );
};

const LoaderPopup: React.FC<{ closeModal: () => void }> = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PiSpinnerBold className="loader-custom h-[10rem] w-[10rem] text-bme-bg" />
    </div>
  );
};

const ValidPopup: React.FC<{ closeModal: () => void; bill: string }> = ({
  closeModal,
  bill,
}) => {
  const dispatch = useDispatch();
  useInterval(() => {
    closeModal();
    dispatch(validateBill(bill));
  }, 1000);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FaCheckCircle className="h-[10rem] w-[10rem] text-green-600" />
    </div>
  );
};

export const ConfirmFactAchatModal: React.FC<{
  billDetail: { piece: string; date: string };
  closeModal: () => void;
}> = ({ billDetail, closeModal }) => {
  const [enableLoader, setEnableLoader] = useState<boolean>(false);
  const [isFactureValid, setIsFactureValid] = useState<boolean>(false);
  const [enableAlert, setEnableAlert] = useState<boolean>(false);

  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  useEffect(() => {
    const isBillValid = billState.billLists.some((bill) => {
      return bill.DO_Piece === billDetail.piece && bill.status === true;
    });

    if (isBillValid) {
      setIsFactureValid(true);

      return;
    }

    setEnableAlert(true);
  }, [billDetail.piece]);

  const className =
    "flex h-[15rem] w-[45rem] flex-col gap-4 overflow-hidden rounded-lg bg-white";

  return (
    <>
      {!enableLoader && !isFactureValid && enableAlert && (
        <div className={className}>
          <BillAlert
            billDetail={billDetail}
            closeModal={closeModal}
            setEnableLoader={setEnableLoader}
            setIsFactureValid={setIsFactureValid}
          />
        </div>
      )}
      {enableLoader && (
        <div className={className}>
          <LoaderPopup closeModal={closeModal} />
        </div>
      )}
      {isFactureValid && (
        <div className={className}>
          <ValidPopup closeModal={closeModal} bill={billDetail.piece} />
        </div>
      )}
    </>
  );
};

export default React.memo(ConfirmFactAchatModal);
