import { useEffect, useMemo, useState } from "react";
import {
  EFilterRetours,
  IRetour,
  IRetourFilter,
  addRetours,
} from "../Store/features/retour";
import { formatDateToFull, formatDateToSend } from "../Utils/Functions";
import { useDispatch } from "react-redux";

interface IFilterData {
  data: IRetour[];
  filterType: IRetourFilter;
}

const filterByStatus = (dataInfo: IFilterData) => {
  if (dataInfo.filterType.status === EFilterRetours.ALL_RETOURS) {
    return dataInfo.data;
  }
  if (dataInfo.filterType.status === EFilterRetours.VALID_RETOURS) {
    const filtereddata = dataInfo.data.filter(
      (retour) => retour.status === true,
    );

    return filtereddata;
  }
  if (dataInfo.filterType.status === EFilterRetours.NO_VALID_RETOURS) {
    const filtereddata = dataInfo.data.filter(
      (retour) => retour.status === false,
    );

    return filtereddata;
  }

  return dataInfo.data;
};

const filterBySearch = (data: IRetour[], retourSearch: string) => {
  if (data.length > 0) {
    return data.filter((retour) =>
      retour.DO_Piece.includes(retourSearch.toLocaleUpperCase()),
    );
  }
  return data;
};

const filterByDate = (data: IRetour[], retourDate: string) => {
  const dateFormatted = formatDateToFull(retourDate);
  if (data.length > 0) {
    return data.filter((retour) => retour.DO_Date.includes(dateFormatted));
  }
  return data;
};

export const useFilterRetoursData = (
  filter: IFilterData,
  setLoader: React.Dispatch<any>,
) => {
  const [data, setData] = useState<IRetour[]>([]);
  const retourFilter = filter.filterType;
  const dispatch = useDispatch();

  const memoizedData = useMemo(() => filter.data, [filter.data]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);

    if (retourFilter.search) {
      filteredData = filterBySearch(
        filteredData,
        retourFilter.search.toString(),
      );
      const interval = setTimeout(() => {
        setData(filteredData);
      }, 1000);
      return () => {
        clearTimeout(interval);
      };
    }
    if (!retourFilter.search) {
      setData(filteredData);
    }
  }, [retourFilter.search, retourFilter.status, memoizedData]);

  useEffect(() => {
    let filteredData = filterByStatus(filter);
    if (retourFilter.date) {
      filteredData = filterByDate(filteredData, retourFilter.date);

      setLoader(true);
      fetch(
        `http://bme_api.test:8080/api/documentsME?date=${formatDateToSend(retourFilter.date)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          dispatch(addRetours(data));
          setLoader(false);
          return;
        });
    }
  }, [retourFilter.date]);

  return { data, setData };
};
