import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ITransfert,
  ITransfertState,
  validateTransfert,
} from "../../Store/features/transfert";
import { GoAlertFill } from "react-icons/go";
import { PiSpinnerBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { IRootState } from "../../Store/store";
import { useInterval } from "../../Hooks/use-interval";
import { formatTransfertForBackend } from "../../Utils/Functions";

const TranfertAlert: React.FC<{
  transfertDetail: ITransfert;
  closeModal: () => void;
  setEnableLoader: React.Dispatch<boolean>;
  setIsFactureValid: React.Dispatch<boolean>;
}> = ({ transfertDetail, closeModal, setEnableLoader, setIsFactureValid }) => {
  return (
    <>
      <div className="h-3 w-full bg-bme-bg"></div>
      <div className="flex w-full items-center gap-16 border-b-2 border-b-gray-500 p-8">
        <div>
          <GoAlertFill className="h-16 w-16 text-bme-bg" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium text-black">
            Vouler vous confirmer le Transfert{" "}
            <span className="text-md font-bold text-bme-bg">
              {transfertDetail.DO_Piece}
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

            const src = formatTransfertForBackend(transfertDetail.DE_src);
            const dest = formatTransfertForBackend(transfertDetail.DE_dest);

            fetch("http://bme_api.test:8080/api/execute-MT-procedure", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date: transfertDetail.DO_Date,
                piece: transfertDetail.DO_Piece,
                src: src,
                dest: dest,
              }), // Convert the request payload to JSON string
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

const ValidPopup: React.FC<{ closeModal: () => void; transfert: string }> = ({
  closeModal,
  transfert,
}) => {
  const dispatch = useDispatch();
  useInterval(() => {
    closeModal();
    dispatch(validateTransfert(transfert));
  }, 1000);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FaCheckCircle className="h-[10rem] w-[10rem] text-green-600" />
    </div>
  );
};

export const ConfirmTransfertModal: React.FC<{
  transfertDetail: ITransfert;
  closeModal: () => void;
}> = ({ transfertDetail, closeModal }) => {
  const [enableLoader, setEnableLoader] = useState<boolean>(false);
  const [isFactureValid, setIsFactureValid] = useState<boolean>(false);
  const [enableAlert, setEnableAlert] = useState<boolean>(false);

  const transfertState = useSelector<IRootState>(
    (state) => state.transferts,
  ) as ITransfertState;

  useEffect(() => {
    const isTransfertValid = transfertState.transfertLists.some((transfert) => {
      return (
        transfert.DO_Piece === transfertDetail.DO_Piece &&
        transfert.status === true
      );
    });

    if (isTransfertValid) {
      setIsFactureValid(true);

      return;
    }

    setEnableAlert(true);
  }, [transfertDetail.DO_Piece]);

  const className =
    "flex h-[15rem] w-[45rem] flex-col gap-4 overflow-hidden rounded-lg bg-white";

  return (
    <>
      {!enableLoader && !isFactureValid && enableAlert && (
        <div className={className}>
          <TranfertAlert
            transfertDetail={transfertDetail}
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
          <ValidPopup
            closeModal={closeModal}
            transfert={transfertDetail.DO_Piece}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(ConfirmTransfertModal);
