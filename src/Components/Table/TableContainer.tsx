import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { IBill, IBillFilter } from "../../Store/features/bills";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal } from "../Modals/FactureModal";
import { useFilterData } from "../../Hooks/UseFilterData";
import { formatDate, formatNumberWithSpace } from "../../Utils/Functions";
import Status from "../Status";
import { FaSort } from "react-icons/fa";
import { BillDetails } from "./TableBillDetails";

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
