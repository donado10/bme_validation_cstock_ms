import { useEffect, useMemo, useState } from "react";
import {
  FilterDate,
  FilterFirstLevel,
  FilterLayout,
  FilterTransfertSearch,
} from "../../Components/Filter/FilterItems";
import { addTransferts, ITransfert } from "../../Store/features/transfert";
import { RiBillLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { useLocation, useSearchParams } from "react-router-dom";
import Title from "../../Components/Title";
import { PiSpinnerBold } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";
import { formatTransfertWareHouse, getDay } from "../../Utils/Functions";
import {
  EFilterTransferts,
  ITransfertState,
  setTransfertFilters,
} from "../../Store/features/transfert";
import { useFilterTransfertsData } from "../../Hooks/UseFilterTransfertsData";
import { TableTransfertsContainer } from "../../Components/Table/TableTransfertsContainer";

const Transfert = () => {
  const [searchParams] = useSearchParams();

  const [filter, setFilter] = useState<{
    status: EFilterTransferts;
    buttons: { all: boolean; valid: boolean; non_valid: boolean };
  }>({
    status: EFilterTransferts.ALL_TRANSFERTS,
    buttons: { all: true, valid: false, non_valid: false },
  });

  const dispatch = useDispatch();
  const transfertState = useSelector<IRootState>(
    (state) => state.transferts,
  ) as ITransfertState;

  const location = useLocation();

  useEffect(() => {
    const date = searchParams.get("date") || getDay();
    setLoader(true);
    fetch(`http://bme_api.test:8080/api/documentsMT?date=${date}`)
      .then((res) => res.json())
      .then((dataRes: ITransfert[]) => {
        dataRes.forEach((trans) => {
          trans.DE_src = formatTransfertWareHouse(trans.DE_src);
          trans.DE_dest = formatTransfertWareHouse(trans.DE_dest);
          const transfertStatus = trans.DO_Ligne.every(
            (trans) => trans.status === true,
          );

          trans.status = transfertStatus;
        });

        setLoader(false);
        dispatch(addTransferts(dataRes));
      });
  }, []);

  useEffect(() => {
    const date =
      new Date(searchParams.get("date")!) < new Date(getDay())
        ? searchParams.get("date")
        : getDay();

    dispatch(setTransfertFilters({ ...transfertState.filter!, date: date }));
  }, [location.search.split("=")[1]]);

  const memoizedTransfertData = useMemo(
    () => transfertState.transfertLists,
    [transfertState.transfertLists],
  );

  const [loader, setLoader] = useState<boolean>(false);

  const { data: filteredData } = useFilterTransfertsData(
    {
      data: memoizedTransfertData,
      filterType: transfertState.filter!,
    },
    setLoader,
  );

  //Calcul nombre de factures
  const transfertsNumber = transfertState.transfertLists.length;
  const validTransferts = transfertState.transfertLists.filter(
    (transfert) => transfert.status === true,
  ).length;
  const invalidTransferts = transfertState.transfertLists.filter(
    (transfert) => transfert.status === false,
  ).length;

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <Title name="Transfert de stock" />
        </div>
        <button
          className="flex items-center gap-4 rounded-lg border-2 border-bme-700 px-4 font-semibold text-bme-700 xs:w-full xs:py-3 xl:w-fit xl:py-1"
          onClick={() => {
            const date = searchParams.get("date");
            setLoader(true);
            fetch(`http://bme_api.test:8080/api/documentsMT?date=${date}`)
              .then((res) => {
                return res.json();
              })
              .then((data: ITransfert[]) => {
                data.forEach((trans) => {
                  trans.DE_src = formatTransfertWareHouse(trans.DE_src);
                  trans.DE_dest = formatTransfertWareHouse(trans.DE_dest);
                  const transfertStatus = trans.DO_Ligne.every(
                    (trans) => trans.status === true,
                  );

                  trans.status = transfertStatus;
                });
                dispatch(addTransferts(data));
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
                name={`Tous les transferts (${transfertsNumber})`}
                selected={filter.buttons.all}
                onClick={() => {
                  setFilter({
                    status: EFilterTransferts.ALL_TRANSFERTS,
                    buttons: { all: true, valid: false, non_valid: false },
                  });

                  dispatch(
                    setTransfertFilters({
                      ...transfertState.filter!,
                      status: EFilterTransferts.ALL_TRANSFERTS,
                    }),
                  );
                }}
              />
            </div>
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Transferts validées (${validTransferts})`}
                selected={filter.buttons.valid}
                onClick={() => {
                  setFilter({
                    status: EFilterTransferts.VALID_TRANSFERTS,
                    buttons: { all: false, valid: true, non_valid: false },
                  });

                  dispatch(
                    setTransfertFilters({
                      ...transfertState.filter!,
                      status: EFilterTransferts.VALID_TRANSFERTS,
                    }),
                  );
                }}
              />
            </div>
            <div className="w-full xl:w-auto">
              <FilterFirstLevel
                logo={<RiBillLine />}
                name={`Transferts non validées (${invalidTransferts})`}
                selected={filter.buttons.non_valid}
                onClick={() => {
                  setFilter({
                    status: EFilterTransferts.NO_VALID_TRANSFERTS,
                    buttons: { all: false, valid: false, non_valid: true },
                  });

                  dispatch(
                    setTransfertFilters({
                      ...transfertState.filter!,
                      status: EFilterTransferts.NO_VALID_TRANSFERTS,
                    }),
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <FilterTransfertSearch />
            </div>
          </div>
        </div>
        <div className="xs:mt-3 xl:mt-0">
          <FilterDate defaultDate={location.search.split("=")[1]!} />
        </div>
      </FilterLayout>
      <div className="w-full">
        {!loader && <TableTransfertsContainer data={filteredData} />}
        {loader && (
          <div className="flex w-full items-center justify-center">
            <PiSpinnerBold className="loader-custom h-[10rem] w-[10rem] text-bme-bg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfert;
