import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../Utils/Functions";
import { useDispatch } from "react-redux";
import { setDepots } from "../Store/features/transfert";

const useGetDepotTransfert = () => {
  const [depotList, setDepotList] = useState<
    {
      Compta21_ID: string;
      CSTOCK21_ID: string;
      Depot: string;
      acronym: string;
    }[]
  >([]);
  const { data, isLoading } = useSWR(
    "http://bme_api.test:8082/api/depots",
    fetcher,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setDepotList([...data]);

    dispatch(setDepots({ depots: [...data] }));
  }, [JSON.stringify(data)]);
  return depotList;
};

export default useGetDepotTransfert;
