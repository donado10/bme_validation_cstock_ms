import { useEffect, useMemo, useState } from "react";
import {
  FilterDateBill,
  FilterFirstLevel,
  FilterLayout,
  FilterBillSearch,
} from "../../Components/Filter/FilterItems";
import {
  addBills,
  EFilterBills,
  IBillState,
  setFilters,
} from "../../Store/features/bills";
import { RiBillLine } from "react-icons/ri";
import { TableBillsContainer } from "../../Components/Table/TableBillsContainer";
import { useFilterBillsData } from "../../Hooks/UseFilterBillsData";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { useSearchParams } from "react-router-dom";
import Title from "../../Components/Title";
import { PiSpinnerBold } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";
import { getDay } from "../../Utils/Functions";
import useGetBillsNumber from "../../Hooks/useGetBillsNumber";

interface IValidation {
  title: string;
  souche: string;
}

const Validation: React.FC<IValidation> = ({ title, souche }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<{
    status: EFilterBills;
  }>({
    status: EFilterBills.ALL_BILLS,
  });

  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get("date")) {
      setSearchParams({ date: getDay() });
    }
    setLoader(true);
  }, []);

  useEffect(() => {
    const date =
      new Date(searchParams.get("date")!) < new Date(getDay())
        ? searchParams.get("date")
        : getDay();

    dispatch(setFilters({ ...billState.filter!, date: date }));
  }, [searchParams.get("date")]);

  const memoizedBillData = useMemo(
    () => billState.billLists,
    [billState.billLists],
  );

  const [loader, setLoader] = useState<boolean>(false);

  const [dataNumber] = useGetBillsNumber();
  const { data: filteredData } = useFilterBillsData(
    {
      data: memoizedBillData,
      filterType: billState.filter!,
    },
    setLoader,
    souche,
  );

  useEffect(() => {
    setLoader(false);
  }, [JSON.stringify(filteredData)]);
  //Calcul nombre de factures
  let billsNumber = dataNumber.all;
  let validBills = dataNumber.valid;
  let invalidBills = dataNumber.non_valid;
  let modifiedBills = dataNumber.modified;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <Title name={title} />
        </div>
        <button
          className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
          onClick={() => {
            const date = searchParams.get("date") || getDay();
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
                selected={filter.status === EFilterBills.ALL_BILLS}
                onClick={() => {
                  setFilter({
                    status: EFilterBills.ALL_BILLS,
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
                selected={filter.status === EFilterBills.VALID_BILLS}
                onClick={() => {
                  setFilter({
                    status: EFilterBills.VALID_BILLS,
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
                selected={filter.status === EFilterBills.NO_VALID_BILLS}
                onClick={() => {
                  setFilter({
                    status: EFilterBills.NO_VALID_BILLS,
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
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Factures Modifiées (${modifiedBills})`}
                selected={filter.status === EFilterBills.MODIFIED_BILLS}
                onClick={() => {
                  setFilter({
                    status: EFilterBills.MODIFIED_BILLS,
                  });

                  dispatch(
                    setFilters({
                      ...billState.filter!,
                      status: EFilterBills.MODIFIED_BILLS,
                    }),
                  );

                  setLoader(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between xs:mt-3 xl:mt-0">
          <FilterDateBill defaultDate={searchParams.get("date")!} />
          <div className="flex items-center gap-4">
            <div className="w-full">
              <FilterBillSearch />
            </div>
          </div>
        </div>
      </FilterLayout>
      <div className="w-full">
        {loader && (
          <div className="flex w-full items-center justify-center">
            <PiSpinnerBold className="loader-custom h-[10rem] w-[10rem] text-bme-bg" />
          </div>
        )}
        {!loader && <TableBillsContainer data={filteredData} />}
      </div>
    </div>
  );
};

export default Validation;
