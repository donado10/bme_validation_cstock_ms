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
import { RiBillLine } from "react-icons/ri";
import {
  FilterDate,
  FilterFirstLevel,
  FilterLayout,
  FilterSearch,
} from "./Components/Filter/FilterItems";

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-semibold text-bme-700">{name}</h1>;
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
          <Title name="Intendance" />
        </div>
        <FilterLayout>
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
        </FilterLayout>
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
