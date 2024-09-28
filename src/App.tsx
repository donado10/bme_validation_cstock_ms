import { IoSearch } from "react-icons/io5";
import "./App.css";
import { TableContainer } from "./Components/Table/TableContainer";
import {
  addBills,
  IBill,
  IBillState,
  setFilters,
} from "./Store/features/bills";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EFilterBills } from "./Hooks/UseFilterData";
import React from "react";
import { IRootState } from "./Store/store";

interface IFilterFirstLevel extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  selected: boolean;
}

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-extrabold text-bme-900">{name}</h1>;
};

const FilterDate = () => {
  return (
    <div className="flex w-fit items-center justify-center border-2 border-bme-600 px-8 py-1 font-bold text-bme-600">
      <input type="date" className="bg-transparent outline-none" />
    </div>
  );
};

const FilterFirstLevel: React.FC<IFilterFirstLevel> = React.forwardRef(
  ({ name, selected, ...props }) => {
    let className =
      "flex items-center justify-center font-bold px-4 py-1 text-bme-900 ";
    if (selected) {
      className =
        "flex items-center justify-center  px-4 py-2 font-semibold text-bme-600 bg-black rounded-lg";
    }

    return (
      <button className={className} {...props}>
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
  return (
    <div className="flex items-center gap-2 rounded-lg border-2 border-bme-900 px-2 py-1">
      <IoSearch className="text-bme-900" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-bme-900 outline-none"
      />
    </div>
  );
};

function App() {
  const [data, setData] = useState<IBill[]>([]);
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
        setData(bills);
        dispatch(addBills(bills));
      });
  }, []);

  return (
    <main className="m-14 rounded-xl bg-white">
      <div className="flex flex-col gap-6 p-8">
        <div>
          <Title name="Factures INTENDANCE" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <FilterFirstLevel
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
          <div>{/* <FilterDate /> */}</div>
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
