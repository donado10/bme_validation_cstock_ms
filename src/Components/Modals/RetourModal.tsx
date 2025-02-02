import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRetourState, validateRetour } from "../../Store/features/retour";
import { GoAlertFill } from "react-icons/go";
import { PiSpinnerBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { IRootState } from "../../Store/store";
import { useInterval } from "../../Hooks/use-interval";

const RetourAlert: React.FC<{
  retourDetail: { piece: string; date: string };
  closeModal: () => void;
  setEnableLoader: React.Dispatch<boolean>;
  setIsFactureValid: React.Dispatch<boolean>;
}> = ({ retourDetail, closeModal, setEnableLoader, setIsFactureValid }) => {
  return (
    <>
      <div className="h-3 w-full bg-bme-bg"></div>
      <div className="flex w-full items-center gap-16 border-b-2 border-b-gray-500 p-8">
        <div>
          <GoAlertFill className="h-16 w-16 text-bme-bg" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-medium text-black">
            Vouler vous confirmer la facture de retour{" "}
            <span className="text-md font-bold text-bme-bg">
              {retourDetail.piece}
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

            if (retourDetail.piece.includes("LGFR")) {
              ref = "RETOURS LP";
            }

            if (retourDetail.piece.includes("IFR")) {
              ref = "RETOURS INT";
            }

            if (retourDetail.piece.includes("RFR")) {
              ref = "RETOURS RB";
            }

            setEnableLoader(true);
            fetch("http://bme_api.test:8080/api/execute-ME-procedure", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date: retourDetail.date,
                piece: retourDetail.piece,
                ref: ref,
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

const ValidPopup: React.FC<{ closeModal: () => void; retour: string }> = ({
  closeModal,
  retour,
}) => {
  const dispatch = useDispatch();
  useInterval(() => {
    closeModal();
    dispatch(validateRetour(retour));
  }, 1000);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <FaCheckCircle className="h-[10rem] w-[10rem] text-green-600" />
    </div>
  );
};

export const ConfirmRetourModal: React.FC<{
  retourDetail: { piece: string; date: string };
  closeModal: () => void;
}> = ({ retourDetail, closeModal }) => {
  const [enableLoader, setEnableLoader] = useState<boolean>(false);
  const [isFactureValid, setIsFactureValid] = useState<boolean>(false);
  const [enableAlert, setEnableAlert] = useState<boolean>(false);

  const retourState = useSelector<IRootState>(
    (state) => state.retours,
  ) as IRetourState;

  useEffect(() => {
    const isRetourValid = retourState.retourLists.some((retour) => {
      return retour.DO_Piece === retourDetail.piece && retour.status === true;
    });

    if (isRetourValid) {
      setIsFactureValid(true);

      return;
    }

    setEnableAlert(true);
  }, [retourDetail.piece]);

  const className =
    "flex h-[17rem] w-[45rem] flex-col gap-4 overflow-hidden rounded-lg bg-white";

  return (
    <>
      {!enableLoader && !isFactureValid && enableAlert && (
        <div className={className}>
          <RetourAlert
            retourDetail={retourDetail}
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
          <ValidPopup closeModal={closeModal} retour={retourDetail.piece} />
        </div>
      )}
    </>
  );
};

export default React.memo(ConfirmRetourModal);
