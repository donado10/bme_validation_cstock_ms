import { useSelector } from "react-redux";
import { IRootState } from "../Store/store";
import { useEffect, useState } from "react";
import { ITransfert, ITransfertState } from "../Store/features/transfert";

const useGetTransfertsNumber = () => {
  const transfertState = useSelector<IRootState>(
    (state) => state.transferts,
  ) as ITransfertState;

  const [numTransfert, setNumTransfert] = useState<{
    all: number;
    valid: number;
    non_valid: number;
  }>({
    all: transfertState.transfertLists.length,
    valid: transfertState.transfertLists.filter(
      (trans) => trans.status === true,
    ).length,
    non_valid: transfertState.transfertLists.filter(
      (trans) => trans.status === false,
    ).length,
  });


  useEffect(() => {
    let dataChange: ITransfert[] = transfertState.transfertLists;

    setNumTransfert({
      all: dataChange.length,
      valid: dataChange.filter((trans) => trans.status === true).length,
      non_valid: dataChange.filter((trans) => trans.status === false).length,
    });

    if (transfertState.filter!.search) {
      dataChange = dataChange.filter((trans) =>
        trans.DO_Piece.includes(transfertState.filter?.search?.toString()!),
      );
      setNumTransfert({
        all: dataChange.length,
        valid: dataChange.filter((trans) => trans.status === true).length,
        non_valid: dataChange.filter((trans) => trans.status === false).length,
      });
    }

    if (transfertState.filter?.warehouse.src) {
      dataChange = dataChange.filter(
        (trans) => trans.DE_src === transfertState.filter?.warehouse.src,
      );

      setNumTransfert({
        all: dataChange.length,
        valid: dataChange.filter((trans) => trans.status === true).length,
        non_valid: dataChange.filter((trans) => trans.status === false).length,
      });
    }

    if (transfertState.filter?.warehouse.dest) {
      dataChange = dataChange.filter(
        (trans) => trans.DE_dest === transfertState.filter?.warehouse.dest,
      );

      setNumTransfert({
        all: dataChange.length,
        valid: dataChange.filter((trans) => trans.status === true).length,
        non_valid: dataChange.filter((trans) => trans.status === false).length,
      });
    }
    return;
  }, [
    transfertState.filter?.search,
    JSON.stringify(transfertState.transfertLists),
    JSON.stringify(transfertState.filter?.warehouse),
  ]);

  return [numTransfert];
};

export default useGetTransfertsNumber;
