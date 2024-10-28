import { useSelector } from "react-redux";
import { IRootState } from "../Store/store";
import { useEffect, useState } from "react";
import { IRetour, IRetourState } from "../Store/features/retour";

const useGetRetoursNumber = () => {
  const retourState = useSelector<IRootState>(
    (state) => state.retours,
  ) as IRetourState;

  const [numRetour, setNumRetour] = useState<{
    all: number;
    valid: number;
    non_valid: number;
  }>({
    all: retourState.retourLists.length,
    valid: retourState.retourLists.filter((retour) => retour.status === true)
      .length,
    non_valid: retourState.retourLists.filter(
      (retour) => retour.status === false,
    ).length,
  });

  useEffect(() => {
    let dataChange: IRetour[] = retourState.retourLists;

    setNumRetour({
      all: dataChange.length,
      valid: dataChange.filter((retour) => retour.status === true).length,
      non_valid: dataChange.filter((retour) => retour.status === false).length,
    });

    if (retourState.filter!.search) {
      dataChange = dataChange.filter((retour) =>
        retour.DO_Piece.includes(retourState.filter?.search?.toString()!),
      );
      setNumRetour({
        all: dataChange.length,
        valid: dataChange.filter((retour) => retour.status === true).length,
        non_valid: dataChange.filter((retour) => retour.status === false)
          .length,
      });
    }

    return;
  }, [retourState.filter?.search, JSON.stringify(retourState.retourLists)]);

  return [numRetour];
};

export default useGetRetoursNumber;
