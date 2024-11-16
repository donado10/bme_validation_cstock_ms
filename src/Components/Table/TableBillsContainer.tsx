import { useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { EFilterBills, IBill, IBillState } from "../../Store/features/bills";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal } from "../Modals/FactureModal";
import { formatDate, formatNumberWithSpace } from "../../Utils/Functions";
import { StatusBill } from "../Status";
import { FaSort } from "react-icons/fa";
import { BillDetails } from "./TableBillDetails";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../Store/features/bills";
import useSortBillsTable from "../../Hooks/UseSortBillsTable";
import { IRootState } from "../../Store/store";
import { IoMdCloseCircle } from "react-icons/io";

export const TableBillsContainer: React.FC<{
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

  const dispatch = useDispatch();

  const tableData: IBill[] = useSortBillsTable(setIsLoading, data);

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
            {billState.filter?.status !== EFilterBills.MODIFIED_BILLS && (
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
            )}
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
                        title="Voir Facture"
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
                const MemoizedCtaModifiedBills = React.memo(() => {
                  return (
                    <div
                      key={bill.DO_Piece}
                      className={`flex items-center gap-6 ${bill.status ? "justify-between" : "justify-end"}`}
                    >
                      {bill.status && (
                        <div className="flex items-center gap-2">
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
                            title="Rendre invalide"
                          >
                            <IoMdCloseCircle className="h-7 w-7 text-red-600" />
                          </button>
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
                            title="Rendre valide"
                          >
                            <HiCheckCircle className="h-7 w-7 text-green-600" />
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setViewBillDetails({
                            piece: bill.DO_Piece,
                            status: true,
                          });
                        }}
                        title="Voir Facture"
                      >
                        <IoEye className="h-7 w-7 text-bme-bg" />
                      </button>
                    </div>
                  );
                });

                return (
                  <Table.BodyRow key={i} rowID={i}>
                    <Table.BodyValue value={bill.DO_Piece} />
                    {billState.filter?.status !==
                      EFilterBills.MODIFIED_BILLS && (
                      <Table.BodyValue value={formatDate(bill.DO_Date)} />
                    )}
                    <Table.BodyValue
                      value={formatNumberWithSpace(bill.DO_TotalHT)}
                    />
                    <Table.BodyValue
                      value={formatNumberWithSpace(bill.DO_TotalTTC)}
                    />
                    <Table.BodyValue
                      element={<StatusBill status={bill.status} />}
                    />
                    {billState.filter?.status !==
                      EFilterBills.MODIFIED_BILLS && (
                      <Table.BodyValue element={<MemoizedCta />} />
                    )}
                    {billState.filter?.status ===
                      EFilterBills.MODIFIED_BILLS && (
                      <Table.BodyValue element={<MemoizedCtaModifiedBills />} />
                    )}
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
