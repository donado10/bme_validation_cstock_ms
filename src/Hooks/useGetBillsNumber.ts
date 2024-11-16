import { useSelector } from "react-redux";
import { IRootState } from "../Store/store";
import { useEffect, useState } from "react";
import { IBill, IBillState } from "../Store/features/bills";

const useGetBillsNumber = () => {
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  const [numBill, setNumBill] = useState<{
    all: number;
    valid: number;
    non_valid: number;
    modified: number;
  }>({
    all: billState.billLists.length,
    valid: billState.billLists.filter((bill) => bill.status === true).length,
    non_valid: billState.billLists.filter((bill) => bill.status === false)
      .length,
    modified: billState.billLists.filter((bill) => bill.modified === true)
      .length,
  });

  useEffect(() => {
    let dataChange: IBill[] = billState.billLists;

    setNumBill({
      all: dataChange.length,
      valid: dataChange.filter((bill) => bill.status === true).length,
      non_valid: dataChange.filter((bill) => bill.status === false).length,
      modified: billState.billLists.filter((bill) => bill.modified === true)
        .length,
    });

    if (billState.filter!.search) {
      dataChange = dataChange.filter((bill) =>
        bill.DO_Piece.includes(billState.filter?.search?.toString()!),
      );
      setNumBill({
        all: dataChange.length,
        valid: dataChange.filter((bill) => bill.status === true).length,
        non_valid: dataChange.filter((bill) => bill.status === false).length,
        modified: billState.billLists.filter((bill) => bill.modified === true)
          .length,
      });
    }

    return;
  }, [billState.filter?.search, JSON.stringify(billState.billLists)]);

  return [numBill];
};

export default useGetBillsNumber;
