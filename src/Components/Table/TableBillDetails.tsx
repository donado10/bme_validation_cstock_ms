import { useEffect, useState } from "react";
import { formatNumberWithSpace } from "../../Utils/Functions";
import Table from "./Table";
import { useSelector } from "react-redux";
import { IBill } from "../../Store/features/bills";
import { IRootState } from "../../Store/store";
import { HiCheckCircle } from "react-icons/hi";
import { IoEye } from "react-icons/io5";

export const BillDetails: React.FC<{
  piece: string;
}> = ({ piece }) => {
  const [data, setData] = useState<IBill | null>(null);
  const billSelector = useSelector((state: IRootState) => state.bills);

  useEffect(() => {
    const bill = billSelector.billLists.find((bill) => bill.DO_Piece === piece);

    if (bill) {
      setData(bill);
    }
  }, []);

  const classNameHeader =
    " border-gray-300/15  py-3 text-center text-xs font-semibold";

  const classNameBody =
    "border-gray-300  text-xs font-normal tracking-wider py-2 text-bme-800";

  return (
    <div className="sm:overflow-x-scroll h-fit w-full overflow-scroll rounded-lg border-2 border-bme-bg [&::-webkit-scrollbar]:hidden">
      <Table>
        <Table.Header>
          <Table.HeaderValue
            value={"Référence article"}
            customClass={`w-1/6 border-r-2 ${classNameHeader} `}
          />
          <Table.HeaderValue
            value={"Designation article"}
            customClass={`w-2/6 border-r-2 ${classNameHeader} `}
          />
          <Table.HeaderValue
            value={"Prix Unitaire HT"}
            customClass={`w-1/6 border-r-2 ${classNameHeader} `}
          />
          <Table.HeaderValue
            value={"Quantité"}
            customClass={` px-2 border-r-2 ${classNameHeader} `}
          />
          <Table.HeaderValue
            value={"Montant HT"}
            customClass={`w-1/6 ${classNameHeader}`}
          />
          <Table.HeaderValue
            value={"Actions"}
            customClass={`w-1/6 border-l-2 text-right px-2 ${classNameHeader}`}
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
                    customClass={`border-r-2 text-center ${classNameBody}`}
                  />
                  <Table.BodyValue
                    value={ligne.DL_Design}
                    customClass={`border-r-2 pl-2 ${classNameBody}`}
                  />
                  <Table.BodyValue
                    value={formatNumberWithSpace(ligne.DL_PrixUnitaire)}
                    customClass={`border-r-2 text-center ${classNameBody}`}
                  />
                  <Table.BodyValue
                    value={ligne.DL_Qte}
                    customClass={`border-r-2 text-center  ${classNameBody}`}
                  />
                  <Table.BodyValue
                    value={formatNumberWithSpace(ligne.DL_MontantHT)}
                    customClass={`text-center ${classNameBody}`}
                  />
                  <Table.BodyValue
                    customClass={`border-l-2 ${classNameBody} text-end pr-2 `}
                    element={
                      <button>
                        <IoEye className="h-7 w-7 text-bme-bg" />
                      </button>
                    }
                  />
                </Table.BodyRow>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};
