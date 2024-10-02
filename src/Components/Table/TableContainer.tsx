import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { IBill, IBillFilter } from "../../Store/features/bills";
import { useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal } from "../Modals/FactureModal";
import { useFilterData } from "../../Hooks/UseFilterData";
import { formatDate, formatNumberWithSpace } from "../../Utils/Functions";
import Status from "../Status";
import { FaSort } from "react-icons/fa";

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-extrabold text-bme-800">{name}</h1>;
};

const BillDetails: React.FC<{
  onRemoveBillDetails: React.Dispatch<{ status: boolean; piece: string }>;
  piece: string;
}> = ({ onRemoveBillDetails, piece }) => {
  const [data, setData] = useState<IBill | null>(null);
  const billSelector = useSelector((state: IRootState) => state.bills);
  useEffect(() => {
    const bill = billSelector.billLists.find((bill) => bill.DO_Piece === piece);

    if (bill) {
      setData(bill);
    }
  }, [location]);

  return (
    <div
      className="overlay fixed inset-0 h-screen w-screen bg-black/50"
      onClick={(e) => {
        if (e.currentTarget.classList.contains("overlay")) {
          onRemoveBillDetails({ status: false, piece: "" });
        }
      }}
    >
      <div className="bill-detail relative h-screen w-screen bg-transparent">
        <div className="custom-animation-fade-in absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
          <div>
            <Title name={piece} />
          </div>
          <div className="h-fit w-full overflow-scroll rounded-lg border-2 border-bme-bg sm:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            <Table>
              <Table.Header>
                <Table.HeaderValue
                  value={"Référence article"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Designation article"}
                  customClass="w-2/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Prix Unitaire HT"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Quantité"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md font-semibold"
                />
                <Table.HeaderValue
                  value={"Montant HT"}
                  customClass="w-1/6   border-gray-300/15  py-2 text-center text-md font-semibold"
                />
              </Table.Header>
              <Table.Body>
                {data &&
                  data?.DO_Ligne?.length > 0 &&
                  data.DO_Ligne.map((ligne, i) => {
                    return (
                      <Table.BodyRow key={i} rowID={i}>
                        <Table.BodyValue
                          value={ligne.AR_Ref}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Design}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(ligne.DL_PrixUnitaire)}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Qte}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(ligne.DL_MontantHT)}
                          customClass=" border-gray-300 px-4 py-2 text-center text-xs font-normal tracking-wider first:text-left last:text-right text-bme-800  "
                        />
                      </Table.BodyRow>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TableContainer: React.FC<{
  raw_data: IBill[];
  filter: IBillFilter;
}> = ({ raw_data, filter }) => {
  const [enableModal, setEnableModal] = useState<{
    confirm: boolean;
    cancel: boolean;
    bill: { piece: string; date: string };
  }>({ confirm: false, cancel: false, bill: { piece: "", date: "" } });

  const [sort, setSort] = useState<{ column: string; order: boolean }>({
    column: "piece",
    order: true,
  });

  const { data, setData } = useFilterData({
    data: raw_data,
    filterType: filter,
  });

  useEffect(() => {
    if (sort.column === "piece") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_Piece.localeCompare(b.DO_Piece);
        }
        return b.DO_Piece.localeCompare(a.DO_Piece);
      });
      setData([...sortedData]);
      return;
    }

    if (sort.column === "ht") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_TotalHT - b.DO_TotalHT;
        }
        return b.DO_TotalHT - a.DO_TotalHT;
      });
      setData([...sortedData]);
      return;
    }

    if (sort.column === "ttc") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_TotalTTC - b.DO_TotalTTC;
        }
        return b.DO_TotalTTC - a.DO_TotalTTC;
      });
      setData([...sortedData]);
      return;
    }

    if (sort.column === "status") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return Number(a.status) - Number(b.status);
        }
        return Number(b.status) - Number(a.status);
      });
      setData([...sortedData]);
      return;
    }
  }, [sort, JSON.stringify(data)]);

  const [viewBillDetails, setViewBillDetails] = useState<{
    status: boolean;
    piece: string;
  }>({ status: false, piece: "" });

  return (
    <div className="max-h-[40rem] w-full overflow-scroll overflow-x-hidden rounded-lg border-2 border-bme-bg">
      <Table>
        <Table.Header>
          <Table.HeaderValue
            element={
              <div className="flex items-center justify-between">
                <span>Piece</span>
                <button
                  onClick={() => {
                    setSort({ column: "piece", order: !sort.order });
                  }}
                >
                  <FaSort />
                </button>
              </div>
            }
          />
          <Table.HeaderValue
            element={
              <div className="flex items-center justify-between">
                <span>Date</span>
                <button>
                  <FaSort />
                </button>
              </div>
            }
          />
          <Table.HeaderValue
            element={
              <div className="flex items-center justify-between">
                <span>Montant HT</span>
                <button
                  onClick={() => {
                    setSort({ column: "ht", order: !sort.order });
                  }}
                >
                  <FaSort />
                </button>
              </div>
            }
          />
          <Table.HeaderValue
            element={
              <div className="flex items-center justify-between">
                <span>Montant TTC</span>
                <button
                  onClick={() => {
                    setSort({ column: "ttc", order: !sort.order });
                  }}
                >
                  <FaSort />
                </button>
              </div>
            }
          />
          <Table.HeaderValue
            element={
              <div className="flex items-center justify-between">
                <span>Status</span>
                <button
                  onClick={() => {
                    setSort({ column: "status", order: !sort.order });
                  }}
                >
                  <FaSort />
                </button>
              </div>
            }
          />
          <Table.HeaderValue value={"Actions"} />
        </Table.Header>
        <Table.Body>
          {data.length > 0 &&
            data.map((bill, i) => {
              return (
                <Table.BodyRow key={i} rowID={i}>
                  <Table.BodyValue value={bill.DO_Piece} />
                  <Table.BodyValue value={formatDate(bill.DO_Date)} />
                  <Table.BodyValue
                    value={formatNumberWithSpace(bill.DO_TotalHT)}
                  />
                  <Table.BodyValue
                    value={formatNumberWithSpace(bill.DO_TotalTTC)}
                  />
                  <Table.BodyValue element={<Status status={bill.status} />} />
                  <Table.BodyValue
                    element={
                      <div className="flex items-center justify-end gap-6">
                        <button
                          onClick={() => {
                            setViewBillDetails({
                              piece: bill.DO_Piece,
                              status: true,
                            });
                          }}
                        >
                          <IoEye className="h-7 w-7 text-bme-bg" />
                        </button>
                        {!bill.status && (
                          <button
                            onClick={() => {
                              setEnableModal({
                                cancel: false,
                                confirm: true,
                                bill: {
                                  piece: bill.DO_Piece,
                                  date: bill.DO_Date,
                                },
                              });
                            }}
                          >
                            <HiCheckCircle className="h-7 w-7 text-green-600" />
                          </button>
                        )}
                      </div>
                    }
                  />
                </Table.BodyRow>
              );
            })}
        </Table.Body>
      </Table>
      {viewBillDetails.status && (
        <BillDetails
          onRemoveBillDetails={setViewBillDetails}
          piece={viewBillDetails.piece}
        />
      )}
      {enableModal.confirm && (
        <MyPortal
          onClose={() => {
            setEnableModal({
              cancel: false,
              confirm: false,
              bill: { date: "", piece: "" },
            });
          }}
          isOpen={enableModal.confirm}
          modal={
            <ConfirmFactModal
              billDetail={{
                piece: enableModal.bill.piece,
                date: enableModal.bill.date,
              }}
              closeModal={() => {
                setEnableModal({
                  cancel: false,
                  confirm: false,
                  bill: { date: "", piece: "" },
                });
              }}
            />
          }
        />
      )}
    </div>
  );
};
