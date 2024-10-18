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

interface IFilterFirstLevel extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  selected: boolean;
  logo: ReactElement<any>;
}

export const FilterDate: React.FC<{ defaultDate?: string }> = ({
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

export const FilterLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="shadow-filter flex flex-col justify-center gap-4 rounded-lg p-8">
      {children}
    </div>
  );
};
