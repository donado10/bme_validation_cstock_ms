import { ReactElement, ReactNode, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { IBillState, setFilters } from "../../Store/features/bills";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { getDay, getEarlierDate } from "../../Utils/Functions";
import { useSearchParams } from "react-router-dom";
import {
  ITransfertState,
  setTransfertFilters,
} from "../../Store/features/transfert";
import { IRetourState, setRetourFilters } from "../../Store/features/retour";

interface IFilterFirstLevel extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  selected: boolean;
  logo: ReactElement<any>;
}

interface IFilterWarehouse extends React.HTMLAttributes<HTMLSelectElement> {
  defaultOption: string;
}

export const FilterDateBill: React.FC<{ defaultDate?: string }> = ({
  defaultDate,
}) => {
  const dispatch = useDispatch();
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;
  const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-8 rounded-lg border-2 border-bme-700 px-2 py-1 font-bold text-bme-700 xs:w-full md:w-fit">
      <div className="flex w-full items-center xs:justify-between xs:py-2 xl:py-0">
        <input
          type="date"
          className="bg-transparent font-semibold outline-none"
          ref={dateRef}
          defaultValue={defaultDate || getDay()}
          onChange={(e) => {
            const date = getEarlierDate(getDay(), e.currentTarget.value);
            e.currentTarget.value = date;
            setSearchParams({ date: date });
            dispatch(
              setFilters({ ...billState.filter!, date: dateRef.current.value }),
            );
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(
            setFilters({ ...billState.filter!, date: dateRef.current.value }),
          );
        }}
      >
        <IoSearch className="h-6 w-6 text-bme-700" />
      </button>
    </div>
  );
};
export const FilterDateRetour: React.FC<{ defaultDate?: string }> = ({
  defaultDate,
}) => {
  const dispatch = useDispatch();
  const retourState = useSelector<IRootState>(
    (state) => state.retours,
  ) as IRetourState;
  const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-8 rounded-lg border-2 border-bme-700 px-2 py-1 font-bold text-bme-700 xs:w-full md:w-fit">
      <div className="flex w-full items-center xs:justify-between xs:py-2 xl:py-0">
        <input
          type="date"
          className="bg-transparent font-semibold outline-none"
          ref={dateRef}
          defaultValue={defaultDate || getDay()}
          onChange={(e) => {
            const date = getEarlierDate(getDay(), e.currentTarget.value);
            e.currentTarget.value = date;
            setSearchParams({ date: date });
            dispatch(
              setRetourFilters({
                ...retourState.filter!,
                date: dateRef.current.value,
              }),
            );
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(
            setRetourFilters({
              ...retourState.filter!,
              date: dateRef.current.value,
            }),
          );
        }}
      >
        <IoSearch className="h-6 w-6 text-bme-700" />
      </button>
    </div>
  );
};

export const FilterDateTransfert: React.FC<{ defaultDate?: string }> = ({
  defaultDate,
}) => {
  const dispatch = useDispatch();
  const transfertState = useSelector<IRootState>(
    (state) => state.transferts,
  ) as ITransfertState;
  const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-8 rounded-lg border-2 border-bme-700 px-2 py-1 font-bold text-bme-700 xs:w-full md:w-fit">
      <div className="flex w-full items-center xs:justify-between xs:py-2 xl:py-0">
        <input
          type="date"
          className="bg-transparent font-semibold outline-none"
          ref={dateRef}
          defaultValue={defaultDate || getDay()}
          onChange={(e) => {
            const date = getEarlierDate(getDay(), e.currentTarget.value);
            e.currentTarget.value = date;
            setSearchParams({ date: date });
            dispatch(
              setTransfertFilters({
                ...transfertState.filter!,
                date: dateRef.current.value,
              }),
            );
          }}
        />
      </div>
      <button
        onClick={() => {
          dispatch(
            setTransfertFilters({
              ...transfertState.filter!,
              date: dateRef.current.value,
            }),
          );
        }}
      >
        <IoSearch className="h-6 w-6 text-bme-700" />
      </button>
    </div>
  );
};

export const FilterFirstLevel: React.FC<IFilterFirstLevel> = React.forwardRef(
  ({ name, selected, logo, ...props }) => {
    let className =
      "xl:w-fit xs:w-full xs:py-3 flex items-center gap-4 font-semibold px-4 xl:py-1 text-bme-700 border-2 border-bme-700 rounded-lg";
    if (selected) {
      className =
        "xl:w-fit xs:w-full xs:py-3 flex items-center gap-4  px-4 xl:py-1 font-semibold text-white bg-bme-bg rounded-lg";
    }

    return (
      <button className={className} {...props}>
        <span>{logo}</span>
        <span>{name}</span>
      </button>
    );
  },
);
export const FilterBillSearch = () => {
  const dispatch = useDispatch();
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-bme-700 px-2 xs:w-full xs:py-3 xl:w-fit xl:py-1">
      <IoSearch className="text-bme-700" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent font-medium text-bme-700 outline-none"
        onChange={(e) => {
          const value = e.currentTarget.value;
          dispatch(setFilters({ ...billState.filter!, search: value }));
        }}
      />
    </div>
  );
};

export const FilterRetourSearch = () => {
  const dispatch = useDispatch();
  const retourState = useSelector<IRootState>(
    (state) => state.retours,
  ) as IRetourState;

  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-bme-700 px-2 xs:w-full xs:py-3 xl:w-fit xl:py-1">
      <IoSearch className="text-bme-700" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent font-medium text-bme-700 outline-none"
        onChange={(e) => {
          const value = e.currentTarget.value;
          dispatch(setRetourFilters({ ...retourState.filter!, search: value }));
        }}
      />
    </div>
  );
};

export const FilterTransfertSearch = () => {
  const dispatch = useDispatch();
  const transfertState = useSelector<IRootState>(
    (state) => state.transferts,
  ) as ITransfertState;

  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-bme-700 px-2 xs:w-full xs:py-3 xl:w-fit xl:py-1">
      <IoSearch className="text-bme-700" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent font-medium text-bme-700 outline-none"
        onChange={(e) => {
          const value = e.currentTarget.value;
          dispatch(
            setTransfertFilters({ ...transfertState.filter!, search: value }),
          );
        }}
      />
    </div>
  );
};

export const FilterLayoutRow: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="shadow-filter flex flex-col justify-center gap-4 rounded-lg p-8">
      {children}
    </div>
  );
};

export const FilterWarehouse: React.FC<IFilterWarehouse> = React.forwardRef(
  ({ defaultOption, ...props }) => {
    const depotMap = new Map<string, string>([
      ["1", "Laprine"],
      ["2", "Expo LG"],
      ["71", "Robert Brun"],
      ["72", "Intendance"],
      ["78", "SAV"],
      ["182", "Retour"],
      ["209", "Camberene 1"],
      ["210", "Camberene 2"],
      ["211", "Camberene 3"],
      ["212", "Camberene 4"],
      ["213", "Camberene 5"],
      ["81", "E ZONE (fict)"],
      ["82", "SENEGALAISE SXMTC (fict)"],
      ["83", "AL Bilal (fict)"],
      ["84", "CCBM Electronics (fict)"],
      ["85", "ELECTRONIC CORP (fict)"],
      ["87", "HOMETECH (fict)"],
      ["90", "ELECTROPLUS (fict)"],
      ["93", "ATLAS COMMERCIAL CENTER (fict)"],
      ["105", "MASSATA EQUIPEMENT (fict)"],
      ["110", "OFFICE CHOICE (fict)"],
      ["121", "ABDOULAHAD MBAYE (fict)"],
      ["126", "SKD DISTRIBUTION (fict)"],
      ["127", "ROYAL GIANT (fict)"],
      ["131", "DIA ELECTRONICS (fict)"],
      ["150", "DEPOT CAC (fict)"],
      ["156", "BIBLOS SENEGAL (fict)"],
      ["167", "SECKENE EQUIPEMENT ET SERVICES (fict)"],
      ["179", "GUANGZHOU ELECTRICAL (fict)"],
      ["191", "SNCIS SARL (fict)"],
      ["214", "EBS REFUS DE PRENDRE (fict)"],
      ["215", "AL RACHID SUARL (fict)"],
      ["216", "TRI STAR ELECTRONICS (fict)"],
      ["217", "ATLAS CONCEPT (fict)"],
      ["218", "CONSTRUCTION ET EQUIPEMENT (fict)"],
    ]);

    let arrDepot: string[] = [];

    depotMap.forEach((value) => {
      arrDepot = [...arrDepot, value];
    });

    return (
      <select
        className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
        {...props}
      >
        <option
          value={defaultOption}
          className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
        >
          {defaultOption}
        </option>
        {arrDepot.map((d) => {
          return (
            <option
              value={d}
              className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
            >
              {d}
            </option>
          );
        })}
      </select>
    );
  },
);

export const FilterLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="shadow-filter flex flex-col justify-center gap-16 rounded-lg p-8">
      {children}
    </div>
  );
};
