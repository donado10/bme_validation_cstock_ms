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
import {
  useLocation,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import Title from "../Components/Title";
import { PiSpinnerBold } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";

interface IValidation {
  title: string;
  souche: string;
  loaderID: string;
}

const Validation: React.FC<IValidation> = ({ title, souche, loaderID }) => {
  const data = useRouteLoaderData(loaderID) as IBill[];
  const [searchParams] = useSearchParams();

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

  const location = useLocation();

  console.log(location.search.split("=")[1]);

  const billsNumber = billState.billLists.length;
  const validBills = billState.billLists.filter(
    (bill) => bill.status === true,
  ).length;
  const invalidBills = billState.billLists.filter(
    (bill) => bill.status === false,
  ).length;

  useEffect(() => {
    dispatch(addBills(data));
    //setSearchParams({ date: getDay() });
  }, []);

  useEffect(() => {
    dispatch(
      setFilters({ ...billState.filter!, date: searchParams.get("date") }),
    );
  }, [location.search.split("=")[1]]);

  const memoizedBillData = useMemo(
    () => billState.billLists,
    [billState.billLists],
  );

  const [loader, setLoader] = useState<boolean>(false);

  const { data: filteredData } = useFilterData(
    {
      data: memoizedBillData,
      filterType: billState.filter!,
    },
    setLoader,
  );

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <Title name={title} />
        </div>
        <button
          className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
          onClick={() => {
            const date = searchParams.get("date");
            setLoader(true);
            fetch(
              `http://bme_api.test:8080/api/newDocuments?date=${date}&souche=${souche}`,
            )
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                dispatch(addBills(data));
                setLoader(false);
              });
          }}
        >
          <GrPowerReset className="h-[1rem] w-[1rem] text-bme-700" />
          <span>Actualiser</span>
        </button>
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
          <FilterDate defaultDate={searchParams.get("date")!} />
        </div>
      </FilterLayout>
      <div className="w-full">
        {!loader && <TableContainer data={filteredData} />}
        {loader && (
          <div className="flex w-full items-center justify-center">
            <PiSpinnerBold className="loader-custom h-[10rem] w-[10rem] text-bme-bg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Validation;