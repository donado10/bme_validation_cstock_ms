import { IoSearch } from "react-icons/io5";
import "./App.css";
import { TableContainer } from "./Components/Table/TableContainer";
import {
  addBills,
  IBill,
  IBillState,
  setFilters,
} from "./Store/features/bills";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EFilterBills } from "./Hooks/UseFilterData";
import React from "react";
import { IRootState } from "./Store/store";
import { RiBillLine } from "react-icons/ri";
import { FaSort } from "react-icons/fa";

interface IFilterFirstLevel extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  selected: boolean;
  logo: ReactElement<any>;
}

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-semibold text-bme-700">{name}</h1>;
};

const FilterDate = () => {
  const dispatch = useDispatch();
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;
  const dateRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  return (
    <div className="flex w-fit items-center gap-8 rounded-lg border-2 border-bme-700 px-2 py-1 font-bold text-bme-700">
      <div>
        <input
          type="date"
          className="bg-transparent font-semibold outline-none"
          ref={dateRef}
          defaultValue={"2024-09-28"}
        />
      </div>
      <button
        onClick={() => {
          console.log(dateRef.current.value);
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

const FilterFirstLevel: React.FC<IFilterFirstLevel> = React.forwardRef(
  ({ name, selected, logo, ...props }) => {
    let className =
      "flex items-center gap-4 font-semibold px-4 py-1 text-bme-700 border-2 border-bme-700 rounded-lg";
    if (selected) {
      className =
        "flex items-center gap-4  px-4 py-1 font-semibold text-white bg-bme-bg rounded-lg";
    }

    return (
      <button className={className} {...props}>
        <span>{logo}</span>
        <span>{name}</span>
      </button>
    );
  },
);

const FilterSecondLevel = () => {
  return (
    <div className="border-2 border-black px-2 py-1">
      <select defaultValue="Select your option" className="outline-none">
        <option disabled>Select your option</option>
      </select>
    </div>
  );
};

const FilterSearch = () => {
  const dispatch = useDispatch();
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-bme-700 px-2 py-1">
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

function App() {
  const [filter, setFilter] = useState<{
    status: EFilterBills;
    buttons: { all: boolean; valid: boolean; non_valid: boolean };
  }>({
    status: EFilterBills.ALL_BILLS,
    buttons: { all: true, valid: false, non_valid: false },
  });
  const dispatch = useDispatch();
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((bills: IBill[]) => {
        dispatch(addBills(bills));
      });
  }, []);

  return (
    <main className="shadow-main m-14 rounded-xl bg-white">
      <div className="flex flex-col gap-6 p-8">
        <div>
          <Title name="Factures INTENDANCE" />
        </div>
        <div className="shadow-filter flex flex-col justify-center gap-4 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <FilterFirstLevel
                  logo={<RiBillLine />}
                  name="Toutes les factures"
                  selected={filter.buttons.all}
                  onClick={() => {
                    setFilter({
                      status: EFilterBills.ALL_BILLS,
                      buttons: { all: true, valid: false, non_valid: false },
                    });

                    dispatch(
                      setFilters({
                        ...billState.filter!,
                        status: EFilterBills.ALL_BILLS,
                      }),
                    );
                  }}
                />
              </div>
              <div>
                <FilterFirstLevel
                  logo={<RiBillLine />}
                  name="Factures validées"
                  selected={filter.buttons.valid}
                  onClick={() => {
                    setFilter({
                      status: EFilterBills.VALID_BILLS,
                      buttons: { all: false, valid: true, non_valid: false },
                    });

                    dispatch(
                      setFilters({
                        ...billState.filter!,
                        status: EFilterBills.VALID_BILLS,
                      }),
                    );
                  }}
                />
              </div>
              <div>
                <FilterFirstLevel
                  logo={<RiBillLine />}
                  name="Factures non validées"
                  selected={filter.buttons.non_valid}
                  onClick={() => {
                    setFilter({
                      status: EFilterBills.NO_VALID_BILLS,
                      buttons: { all: false, valid: false, non_valid: true },
                    });

                    dispatch(
                      setFilters({
                        ...billState.filter!,
                        status: EFilterBills.NO_VALID_BILLS,
                      }),
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <FilterSearch />
              </div>
            </div>
          </div>
          <div>
            <FilterDate />
          </div>
        </div>
        <div className="w-full">
          <TableContainer
            raw_data={billState.billLists}
            filter={billState.filter!}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
