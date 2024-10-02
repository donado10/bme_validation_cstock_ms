import { useEffect, useState } from "react";
import { formatNumberWithSpace } from "../../Utils/Functions";
import Title from "../Title";
import Table from "./Table";
import { useSelector } from "react-redux";
import { IBill } from "../../Store/features/bills";
import { IRootState } from "../../Store/store";

export const BillDetails: React.FC<{
  onRemoveBillDetails: React.Dispatch<{ status: boolean; piece: string }>;
  piece: string;
}> = ({ onRemoveBillDetails, piece }) => {
  const [data, setData] = useState<IBill | null>(null);
  const billSelector = useSelector((state: IRootState) => state.bills);
  useEffect(() => {
    const bill = billSelector.billLists.find((bill) => bill.DO_Piece === piece);

    if (bill) {
      setData(bill);
    }
  }, [location]);

  return (
    <div
      className="overlay fixed inset-0 h-screen w-screen bg-black/50"
      onClick={(e) => {
        if (e.currentTarget.classList.contains("overlay")) {
          onRemoveBillDetails({ status: false, piece: "" });
        }
      }}
    >
      <div className="bill-detail relative h-screen w-screen bg-transparent">
        <div className="custom-animation-fade-in absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
          <div>
            <Title name={piece} />
          </div>
          <div className="h-fit w-full overflow-scroll rounded-lg border-2 border-bme-bg sm:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            <Table>
              <Table.Header>
                <Table.HeaderValue
                  value={"Référence article"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Designation article"}
                  customClass="w-2/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Prix Unitaire HT"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Quantité"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Montant HT"}
                  customClass="w-1/6   border-gray-300/15  py-2 text-center text-md font-semibold"
                />
              </Table.Header>
              <Table.Body>
                {data &&
                  data?.DO_Ligne?.length > 0 &&
                  data.DO_Ligne.map((ligne, i) => {
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
