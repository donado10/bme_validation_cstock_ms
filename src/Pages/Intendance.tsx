import { useEffect, useMemo, useState } from "react";
import {
  FilterDate,
  FilterFirstLevel,
  FilterLayout,
  FilterSearch,
} from "../Components/Filter/FilterItems";
import {
  addBills,
  IBill,
  IBillState,
  setFilters,
} from "../Store/features/bills";
import { RiBillLine } from "react-icons/ri";
import { TableContainer } from "../Components/Table/TableContainer";
import { EFilterBills } from "../Hooks/UseFilterData";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../Store/store";
import { useRouteLoaderData } from "react-router-dom";
import Title from "../Components/Title";
import { getPreviousDay } from "../Utils/Functions";

const Intendance = () => {
  const data = useRouteLoaderData("intendance-id") as IBill[];

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
    dispatch(addBills(data));
  }, []);

  const memoizedBillData = useMemo(
    () => billState.billLists,
    [billState.billLists],
  );

  return (
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
          raw_data={memoizedBillData}
          filter={billState.filter!}
        />
      </div>
    </div>
  );
};

export async function intendanceLoader() {
  const date = getPreviousDay();

  const response = await fetch(
    `http://bme_api.test:8080/api/documents?date=${date}&souche=IFV`,
  );

  const data: IBill[] = await response.json();

  return data;
}

export default Intendance;
