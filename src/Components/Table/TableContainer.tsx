import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { IBill, IBillState } from "../../Store/features/bills";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal } from "../Modals/FactureModal";
import { formatDate, formatNumberWithSpace } from "../../Utils/Functions";
import Status from "../Status";
import { FaSort } from "react-icons/fa";
import { BillDetails } from "./TableBillDetails";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { setSort } from "../../Store/features/bills";

export const TableContainer: React.FC<{
  data: IBill[];
}> = ({ data }) => {
  const [enableModal, setEnableModal] = useState<{
    confirm: boolean;
    cancel: boolean;
    bill: { piece: string; date: string };
  }>({ confirm: false, cancel: false, bill: { piece: "", date: "" } });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [viewBillDetails, setViewBillDetails] = useState<{
    status: boolean;
    piece: string;
  }>({ status: false, piece: "" });

  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  const [tableData, setTableData] = useState<IBill[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const sort = billState.sort!;

    if (sort.column === "piece") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DO_Piece.localeCompare(b.DO_Piece);
        }
        return b.DO_Piece.localeCompare(a.DO_Piece);
      });
      setTableData(sortedData);
      setIsLoading(true);
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
      setTableData(sortedData);
      setIsLoading(true);
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
      setTableData(sortedData);
      setIsLoading(true);
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
      setTableData(sortedData);
      setIsLoading(true);
      return;
    }
  }, [JSON.stringify(billState.sort), JSON.stringify(data)]);

  return (
    <div className="max-h-[40rem] w-full overflow-scroll overflow-x-scroll rounded-lg border-2 border-bme-bg">
      {isLoading && (
        <Table>
          <Table.Header>
            <Table.HeaderValue
              element={
                <div className="flex items-center justify-between">
                  <span>Piece</span>
                  <button
                    onClick={() => {
                      const sort = billState.sort!;
                      dispatch(
                        setSort({ column: "piece", order: !sort.order }),
                      );
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
                      const sort = billState.sort!;
                      dispatch(setSort({ column: "ht", order: !sort.order }));
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
                      const sort = billState.sort!;
                      dispatch(setSort({ column: "ttc", order: !sort.order }));
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
                      const sort = billState.sort!;
                      dispatch(
                        setSort({ column: "status", order: !sort.order }),
                      );
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
            {tableData.length > 0 &&
              tableData.map((bill, i) => {
                const MemoizedCta = React.memo(() => {
                  return (
                    <div
                      key={bill.DO_Piece}
                      className="flex items-center justify-end gap-6"
                    >
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
                  );
                });

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
                    <Table.BodyValue
                      element={<Status status={bill.status} />}
                    />
                    <Table.BodyValue element={<MemoizedCta />} />
                  </Table.BodyRow>
                );
              })}
          </Table.Body>
        </Table>
      )}
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
