import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  invalidBill,
  setModifiedBill,
  validateBill,
} from "../../Store/features/bills";
import { GoAlertFill } from "react-icons/go";
import { PiSpinnerBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { useInterval } from "../../Hooks/use-interval";

const BillAlert: React.FC<{
  billDetail: { piece: string; set: boolean };
  closeModal: () => void;
  setEnableLoader: React.Dispatch<boolean>;
  setIsFactureValid: React.Dispatch<boolean>;
  setEnableAlert: React.Dispatch<boolean>;
}> = ({
  billDetail,
  closeModal,
  setEnableLoader,
  setIsFactureValid,
  setEnableAlert,
}) => {
  return (
    <>
      <div className="h-3 w-full bg-bme-bg"></div>
      <div className="flex w-full items-center gap-16 border-b-2 border-b-gray-500 p-8">
        <div>
          <GoAlertFill className="h-16 w-16 text-bme-bg" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium text-black">
            Le nouveau status de{" "}
            <span className="text-md font-bold text-bme-bg">
              {billDetail.piece}
            </span>{" "}
            sera {billDetail.set ? "valide" : "invalide"}. Vouler vous confirmer
            ?
          </h1>
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
            fetch("http://bme_api.test:8080/api/update-bill", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                piece: billDetail.piece,
                set: billDetail.set,
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
                setEnableAlert(false);
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

const ValidPopup: React.FC<{
  closeModal: () => void;
  bill: { piece: string; set: boolean };
}> = ({ closeModal, bill }) => {
  const dispatch = useDispatch();
  useInterval(() => {
    closeModal();

    if (bill.set) {
      dispatch(validateBill(bill.piece));
      dispatch(setModifiedBill({ piece: bill.piece, value: false }));
    } else {
      dispatch(invalidBill(bill.piece));
      dispatch(setModifiedBill({ piece: bill.piece, value: false }));
    }
  }, 1000);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FaCheckCircle className="h-[10rem] w-[10rem] text-green-600" />
    </div>
  );
};

export const ConfirmFactNewStateModal: React.FC<{
  billDetail: { piece: string; set: boolean };
  closeModal: () => void;
}> = ({ billDetail, closeModal }) => {
  const [enableLoader, setEnableLoader] = useState<boolean>(false);
  const [isFactureValid, setIsFactureValid] = useState<boolean>(false);
  const [enableAlert, setEnableAlert] = useState<boolean>(true);

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
            setEnableAlert={setEnableAlert}
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
          <ValidPopup closeModal={closeModal} bill={billDetail} />
        </div>
      )}
    </>
  );
};

export default React.memo(ConfirmFactNewStateModal);
