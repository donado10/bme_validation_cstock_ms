import { useEffect, useState } from "react";
import { IBill, IBillFilter } from "../Store/features/bills";
import { formatDate, formatDateToFull } from "../Utils/Functions";

export enum EFilterBills {
  ALL_BILLS,
  VALID_BILLS,
  NO_VALID_BILLS,
}

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
  console.log(dateFormatted);
  if (data.length > 0) {
    return data.filter((bill) => bill.DO_Date.includes(dateFormatted));
  }
  return data;
};

export const useFilterData = (filter: IFilterData) => {
  const [data, setData] = useState<IBill[]>([]);
  const billFilter = filter.filterType;

  useEffect(() => {
    let filteredData = filterByStatus(filter);
    setData(filteredData);

    if (billFilter.search) {
      filteredData = filterBySearch(filteredData, billFilter.search.toString());

      setData(filteredData);
    }

    if (billFilter.date) {
      filteredData = filterByDate(filteredData, billFilter.date);

      setData(filteredData);
    }
  }, [billFilter.status, billFilter.search, billFilter.date, filter.data]);

  return { data, setData };
};
