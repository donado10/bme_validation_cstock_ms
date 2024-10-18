import { useEffect, useState } from "react";
import { formatNumberWithSpace } from "../../Utils/Functions";
import Title from "../Title";
import Table from "./Table";
import { useSelector } from "react-redux";
import { ITransfert } from "../../Store/features/transfert";
import { IRootState } from "../../Store/store";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

export const TransfertDetails: React.FC<{
  onRemoveTransfertDetails: React.Dispatch<{ status: boolean; piece: string }>;
  piece: string;
}> = ({ onRemoveTransfertDetails, piece }) => {
  const [data, setData] = useState<ITransfert | null>(null);
  const transfertSelector = useSelector(
    (state: IRootState) => state.transferts,
  );
  useEffect(() => {
    const transfert = transfertSelector.transfertLists.find(
      (transfert) => transfert.DO_Piece === piece,
    );

    if (transfert) {
      setData(transfert);
    }
  }, [location]);

  return (
    <div
      className="overlay fixed inset-0 h-screen w-screen bg-black/50"
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("wrapper")) {
          onRemoveTransfertDetails({ status: false, piece: "" });
        }
      }}
    >
      <div className="wrapper relative h-screen w-screen bg-transparent">
        <div className="transfert-detail custom-animation-fade-in absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
          <div>
            <Title name={piece} />
          </div>
          <div className="sm:overflow-x-scroll h-fit w-full overflow-scroll rounded-lg border-2 border-bme-bg [&::-webkit-scrollbar]:hidden">
            <Table>
              <Table.Header>
                <Table.HeaderValue
                  value={"Référence article"}
                  customClass="w-1/7  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Designation article"}
                  customClass="w-2/7  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Prix Unitaire HT"}
                  customClass="w-1/7  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Quantité"}
                  customClass="w-1/7  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Montant HT"}
                  customClass="w-1/7 border-r-2   border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Status"}
                  customClass="w-1/7   border-gray-300/15  py-2 text-center text-md font-semibold"
                />
              </Table.Header>
              <Table.Body>
                {data &&
                  data?.DO_Ligne?.length > 0 &&
                  data.DO_Ligne.map((ligne, i) => {
                    const MemoizedCta = React.memo(() => {
                      return (
                        <div className="flex items-center justify-center gap-6">
                          {ligne.status && (
                            <div>
                              <FaCheck className="h-7 w-7 text-green-600" />
                            </div>
                          )}
                          {!ligne.status && (
                            <div>
                              <IoClose className="h-7 w-7 text-red-600" />
                            </div>
                          )}
                        </div>
                      );
                    });

                    return (
                      <Table.BodyRow key={i} rowID={i}>
                        <Table.BodyValue
                          value={ligne.AR_Ref}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Design}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(ligne.DL_PrixUnitaire)}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Qte}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(ligne.DL_MontantHT)}
                          customClass=" border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800  "
                        />
                        <Table.BodyValue
                          element={<MemoizedCta />}
                          customClass=" border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800  "
                        />
                      </Table.BodyRow>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
