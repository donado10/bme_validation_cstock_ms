import { useEffect, useState } from "react";
import { IBill, IBillFilter } from "../Store/features/bills";

export enum EFilterBills {
  ALL_BILLS,
  VALID_BILLS,
  NO_VALID_BILLS,
}

interface IFilterData {
  data: IBill[];
  filterType: IBillFilter;
}

export const useFilterData = (filter: IFilterData) => {
  const [data, setData] = useState<IBill[]>([]);
  const billFilter = filter.filterType;

  useEffect(() => {
    if (billFilter.status === EFilterBills.ALL_BILLS) {
      setData(filter.data);
      return;
    }
    if (billFilter.status === EFilterBills.VALID_BILLS) {
      const filterdata = filter.data.filter((bill) => bill.status === true);
      setData(filterdata);
      return;
    }
    if (billFilter.status === EFilterBills.NO_VALID_BILLS) {
      const filterdata = filter.data.filter((bill) => bill.status === false);
      setData(filterdata);
      return;
    }
  }, [billFilter.status, filter.data]);

  return data;
};
