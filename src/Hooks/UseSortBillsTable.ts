import { useEffect, useState } from "react";
import { IBill, IBillState } from "../Store/features/bills";
import { useSelector } from "react-redux";
import { IRootState } from "../Store/store";

const useSortBillsTable = (
  setIsLoading: (value: boolean) => void,
  data: IBill[],
) => {
  const [tableData, setTableData] = useState<IBill[]>([]);

  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  useEffect(() => {
    const sort = billState.sort!;

    if (sort.column === "piece") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_Piece.localeCompare(b.DO_Piece);
        }
        return b.DO_Piece.localeCompare(a.DO_Piece);
      });
      setTableData(sortedData);
      setIsLoading(true);
      return;
    }

    if (sort.column === "ht") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_TotalHT - b.DO_TotalHT;
        }
        return b.DO_TotalHT - a.DO_TotalHT;
      });
      setTableData(sortedData);
      setIsLoading(true);
      return;
    }

    if (sort.column === "ttc") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_TotalTTC - b.DO_TotalTTC;
        }
        return b.DO_TotalTTC - a.DO_TotalTTC;
      });
      setTableData(sortedData);
      setIsLoading(true);
      return;
    }

    if (sort.column === "status") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return Number(a.status) - Number(b.status);
        }
        return Number(b.status) - Number(a.status);
      });
      setTableData(sortedData);
      setIsLoading(true);
      return;
    }
  }, [JSON.stringify(billState.sort), JSON.stringify(data)]);

  return tableData;
};

export default useSortBillsTable;
