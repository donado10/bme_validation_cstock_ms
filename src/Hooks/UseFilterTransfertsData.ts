import { useEffect, useMemo, useState } from "react";
import {
  EFilterTransferts,
  ITransfert,
  ITransfertFilter,
  addTransferts,
} from "../Store/features/transfert";
import { formatDateToSend, formatTransfertWareHouse } from "../Utils/Functions";
import { useDispatch } from "react-redux";

interface IFilterData {
  data: ITransfert[];
  filterType: ITransfertFilter;
}

const filterByStatus = (dataInfo: IFilterData) => {
  if (dataInfo.filterType.status === EFilterTransferts.ALL_TRANSFERTS) {
    return dataInfo.data;
  }
  if (dataInfo.filterType.status === EFilterTransferts.VALID_TRANSFERTS) {
    const filtereddata = dataInfo.data.filter(
      (transfert) => transfert.status === true,
    );

    return filtereddata;
  }
  if (dataInfo.filterType.status === EFilterTransferts.NO_VALID_TRANSFERTS) {
    const filtereddata = dataInfo.data.filter(
      (transfert) => transfert.status === false,
    );

    return filtereddata;
  }

  return dataInfo.data;
};

const filterBySearch = (data: ITransfert[], transfertSearch: string) => {
  if (data.length > 0) {
    return data.filter((transfert) =>
      transfert.DO_Piece.includes(transfertSearch.toLocaleUpperCase()),
    );
  }
  return data;
};

const filterByWarehouseSrc = (data: ITransfert[], warehouse: string) => {
  if (data.length > 0) {
    return data.filter((transfert) =>
      transfert.DE_src.toLocaleLowerCase().includes(
        warehouse.toLocaleLowerCase(),
      ),
    );
  }

  return data;
};
const filterByWarehouseDest = (data: ITransfert[], warehouse: string) => {
  if (data.length > 0) {
    return data.filter((transfert) =>
      transfert.DE_dest.toLocaleLowerCase().includes(
        warehouse.toLocaleLowerCase(),
      ),
    );
  }

  return data;
};

/* const filterByDate = (data: ITransfert[], transfertDate: string) => {
  const dateFormatted = formatDateToFull(transfertDate);
  if (data.length > 0) {
    return data.filter((transfert) =>
      transfert.DO_Date.includes(dateFormatted),
    );
  }
  return data;
};
 */
export const useFilterTransfertsData = (
  filter: IFilterData,
  setLoader: React.Dispatch<any>,
) => {
  const [data, setData] = useState<ITransfert[]>([]);
  const transfertFilter = filter.filterType;
  const dispatch = useDispatch();
  //const location = useLocation();

  const memoizedData = useMemo(() => filter.data, [filter.data]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);

    

    if (transfertFilter.search) {
      filteredData = filterBySearch(
        filteredData,
        transfertFilter.search.toString(),
      );
      const interval = setTimeout(() => {
        setData(filteredData);

        if (transfertFilter.warehouse.src) {
          filteredData = filterByWarehouseSrc(
            filteredData,
            transfertFilter.warehouse.src,
          );
          setData(filteredData);
        }
    
        if (transfertFilter.warehouse.dest) {
          filteredData = filterByWarehouseDest(
            filteredData,
            transfertFilter.warehouse.dest,
          );
          setData(filteredData);
        }
      }, 1000);

      return () => {
        clearTimeout(interval);
      };
    }

    if (!transfertFilter.search) {
      if (transfertFilter.warehouse.src) {
        filteredData = filterByWarehouseSrc(
          filteredData,
          transfertFilter.warehouse.src,
        );
        setData(filteredData);
      }
  
      if (transfertFilter.warehouse.dest) {
        filteredData = filterByWarehouseDest(
          filteredData,
          transfertFilter.warehouse.dest,
        );
        setData(filteredData);
      }

      setData(filteredData);


    }
  }, [
    JSON.stringify(transfertFilter.warehouse),
    transfertFilter.search,
    transfertFilter.status,
    memoizedData,
  ]);

  useEffect(() => {
    if (transfertFilter.date) {
      setLoader(true);
      fetch(
        `http://bme_api.test:8080/api/documentsMT?date=${formatDateToSend(transfertFilter.date)}`,
      )
        .then((res) => res.json())
        .then((data: ITransfert[]) => {
          data.forEach((trans) => {
            trans.DE_src = formatTransfertWareHouse(trans.DE_src);
            trans.DE_dest = formatTransfertWareHouse(trans.DE_dest);
            const transfertStatus = trans.DO_Ligne.every(
              (trans) => trans.status === true,
            );

            trans.status = transfertStatus;
          });
          setData(data);
          dispatch(addTransferts(data));
          setLoader(false);
          return;
        });
    }
  }, [transfertFilter.date]);

  return { data, setData };
};
