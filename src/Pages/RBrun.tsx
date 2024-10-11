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
import { EFilterBills, useFilterData } from "../Hooks/UseFilterData";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../Store/store";
import { useRouteLoaderData } from "react-router-dom";
import Title from "../Components/Title";
import { getPreviousDay } from "../Utils/Functions";

const RBrun = () => {
  const data = useRouteLoaderData("rbrun-id") as IBill[];

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

  const billsNumber = billState.billLists.length;
  const validBills = billState.billLists.filter(
    (bill) => bill.status === true,
  ).length;
  const invalidBills = billState.billLists.filter(
    (bill) => bill.status === false,
  ).length;

  useEffect(() => {
    dispatch(addBills(data));
  }, []);

  const memoizedBillData = useMemo(
    () => billState.billLists,
    [billState.billLists],
  );

  const { data: filteredData } = useFilterData({
    data: memoizedBillData,
    filterType: billState.filter!,
  });

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <Title name="Robert Brun" />
      </div>
      <FilterLayout>
        <div className="flex justify-between xs:flex-col xs:gap-8 xl:flex-row xl:items-center xl:gap-4">
          <div className="flex xs:flex-col xs:items-start xs:gap-8 xl:flex-row xl:items-center xl:gap-8">
            <div className="xs:w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Toutes les factures (${billsNumber})`}
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
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Factures validées (${validBills})`}
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
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Factures non validées (${invalidBills})`}
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
            <div className="w-full">
              <FilterSearch />
            </div>
          </div>
        </div>
        <div className="xs:mt-3 xl:mt-0">
          <FilterDate />
        </div>
      </FilterLayout>
      <div className="w-full">
        <TableContainer data={filteredData} />
      </div>
    </div>
  );
};

export async function rbrunLoader() {
  const date = getPreviousDay();

  const response = await fetch(
    `http://bme_api.test:8080/api/documents?date=${date}&souche=RFV`,
  );

  const data: IBill[] = await response.json();

  return data;
}

export default RBrun;
