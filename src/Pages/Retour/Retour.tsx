import { useEffect, useMemo, useState } from "react";
import {
  FilterDateRetour,
  FilterFirstLevel,
  FilterLayout,
  FilterRetourSearch,
} from "../../Components/Filter/FilterItems";
import {
  addRetours,
  EFilterRetours,
  IRetourState,
  setRetourFilters,
} from "../../Store/features/retour";
import { RiBillLine } from "react-icons/ri";
import { TableRetoursContainer } from "../../Components/Table/TableRetoursContainer";
import { useFilterRetoursData } from "../../Hooks/UseFilterRetoursData";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { useSearchParams } from "react-router-dom";
import Title from "../../Components/Title";
import { PiSpinnerBold } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";
import { getDay } from "../../Utils/Functions";
import useGetRetoursNumber from "../../Hooks/useGetRetoursNumber";

const Validation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<{
    status: EFilterRetours;
    buttons: { all: boolean; valid: boolean; non_valid: boolean };
  }>({
    status: EFilterRetours.ALL_RETOURS,
    buttons: { all: true, valid: false, non_valid: false },
  });

  const dispatch = useDispatch();
  const retourState = useSelector<IRootState>(
    (state) => state.retours,
  ) as IRetourState;

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

    dispatch(setRetourFilters({ ...retourState.filter!, date: date }));
  }, [searchParams.get("date")]);

  const memoizedRetourData = useMemo(
    () => retourState.retourLists,
    [retourState.retourLists],
  );

  const [loader, setLoader] = useState<boolean>(false);

  const [dataNumber] = useGetRetoursNumber();
  const { data: filteredData } = useFilterRetoursData(
    {
      data: memoizedRetourData,
      filterType: retourState.filter!,
    },
    setLoader,
  );

  //Calcul nombre de factures
  let retoursNumber = dataNumber.all;
  let validRetours = dataNumber.valid;
  let invalidRetours = dataNumber.non_valid;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <Title name="Facture Retours" />
        </div>
        <button
          className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
          onClick={() => {
            const date = searchParams.get("date") || getDay();
            setLoader(true);
            fetch(
              `http://bme_api.test:8080/api/newDocuments?date=${date}&souche=${""}`,
            )
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                dispatch(addRetours(data));
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
                name={`Toutes les factures (${retoursNumber})`}
                selected={filter.buttons.all}
                onClick={() => {
                  setFilter({
                    status: EFilterRetours.ALL_RETOURS,
                    buttons: { all: true, valid: false, non_valid: false },
                  });

                  dispatch(
                    setRetourFilters({
                      ...retourState.filter!,
                      status: EFilterRetours.ALL_RETOURS,
                    }),
                  );
                }}
              />
            </div>
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Factures validées (${validRetours})`}
                selected={filter.buttons.valid}
                onClick={() => {
                  setFilter({
                    status: EFilterRetours.VALID_RETOURS,
                    buttons: { all: false, valid: true, non_valid: false },
                  });

                  dispatch(
                    setRetourFilters({
                      ...retourState.filter!,
                      status: EFilterRetours.VALID_RETOURS,
                    }),
                  );
                }}
              />
            </div>
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Factures non validées (${invalidRetours})`}
                selected={filter.buttons.non_valid}
                onClick={() => {
                  setFilter({
                    status: EFilterRetours.NO_VALID_RETOURS,
                    buttons: { all: false, valid: false, non_valid: true },
                  });

                  dispatch(
                    setRetourFilters({
                      ...retourState.filter!,
                      status: EFilterRetours.NO_VALID_RETOURS,
                    }),
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <FilterRetourSearch />
            </div>
          </div>
        </div>
        <div className="xs:mt-3 xl:mt-0">
          <FilterDateRetour defaultDate={searchParams.get("date")!} />
        </div>
      </FilterLayout>
      <div className="w-full">
        {!loader && <TableRetoursContainer data={filteredData} />}
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
