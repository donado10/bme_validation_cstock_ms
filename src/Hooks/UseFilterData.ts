import { useEffect, useState } from "react";
import { IBill, IBillFilter, addBills } from "../Store/features/bills";
import {
  formatDate,
  formatDateToFull,
  formatDateToSend,
} from "../Utils/Functions";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

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
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname.split("/")[1]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);

    if (billFilter.search) {
      filteredData = filterBySearch(filteredData, billFilter.search.toString());

      setData(filteredData);
    }
    return;
  }, [billFilter.search, filter.data]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);
    setData(filteredData);
  }, [billFilter.status, filter.data]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);
    if (billFilter.date) {
      filteredData = filterByDate(filteredData, billFilter.date);
      let souche = location.pathname.split("/")[1].toLowerCase();

      if (souche === "intendance") {
        souche = "IFV";
      }
      if (souche === "rbrun") {
        souche = "RFV";
      }
      if (souche === "laprine") {
        souche = "LGFV";
      }

      fetch(
        `http://bme_api.test:8080/api/documents?date=${formatDateToSend(billFilter.date)}&souche=${souche}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          dispatch(addBills(data));
          return;
        });
    }
  }, [billFilter.date]);

  return { data, setData };
};
