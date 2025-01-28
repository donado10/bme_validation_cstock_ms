import { useEffect, useMemo, useState } from "react";
import {
  EFilterBills,
  IBill,
  IBillFilter,
  addBills,
} from "../Store/features/bills";
import { formatDateToFull, formatDateToSend } from "../Utils/Functions";
import { useDispatch } from "react-redux";

interface IFilterData {
  data: IBill[];
  filterType: IBillFilter;
}

const filterByStatus = (dataInfo: IFilterData) => {
  if (dataInfo.filterType.status === EFilterBills.ALL_BILLS) {
    return dataInfo.data;
  }
  if (dataInfo.filterType.status === EFilterBills.VALID_BILLS) {
    const filtereddata = dataInfo.data.filter((bill) => bill.status === true);

    return filtereddata;
  }
  if (dataInfo.filterType.status === EFilterBills.NO_VALID_BILLS) {
    const filtereddata = dataInfo.data.filter((bill) => bill.status === false);

    return filtereddata;
  }
  if (dataInfo.filterType.status === EFilterBills.MODIFIED_BILLS) {
    const filtereddata = dataInfo.data.filter((bill) => bill.modified === true);

    return filtereddata;
  }

  return dataInfo.data;
};

const filterBySearch = (data: IBill[], billSearch: string) => {
  if (data.length > 0) {
    return data.filter((bill) =>
      bill.DO_Piece.includes(billSearch.toLocaleUpperCase()),
    );
  }
  return data;
};

const filterByDate = (data: IBill[], billDate: string) => {
  const dateFormatted = formatDateToFull(billDate);
  if (data.length > 0) {
    return data.filter((bill) => bill.DO_Date.includes(dateFormatted));
  }
  return data;
};

export const useFilterBillsAchatData = (
  filter: IFilterData,
  setLoader: React.Dispatch<any>,
) => {
  const [data, setData] = useState<IBill[]>([]);
  const billFilter = filter.filterType;
  const dispatch = useDispatch();

  const memoizedData = useMemo(() => filter.data, [filter.data]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);

    if (billFilter.search) {
      filteredData = filterBySearch(filteredData, billFilter.search.toString());
      const interval = setTimeout(() => {
        setData(filteredData);
      }, 1000);
      return () => {
        clearTimeout(interval);
      };
    }
    if (!billFilter.search) {
      setData(filteredData);
    }
  }, [billFilter.search, billFilter.status, memoizedData]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);
    if (billFilter.date) {
      filteredData = filterByDate(filteredData, billFilter.date);

      setLoader(true);
      fetch(
        `http://bme_api.test:8080/api/getDocumentsAC?date=${formatDateToSend(billFilter.date)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          dispatch(addBills(data));
          setLoader(false);
          return;
        });
    }
  }, [billFilter.date]);

  return { data, setData };
};
