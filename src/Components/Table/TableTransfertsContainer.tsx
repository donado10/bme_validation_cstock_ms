import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import {
  ITransfert,
  ITransfertState,
  setFilterSort,
} from "../../Store/features/transfert";
import MyPortal from "../Modals/Overlay";
import { formatDate } from "../../Utils/Functions";
import Status from "../Status";
import { FaSort } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { TransfertDetails } from "./TableTransfertDetails";
import { ConfirmTransfertModal } from "../Modals/TransfertModal";

export const TableTransfertsContainer: React.FC<{
  data: ITransfert[];
}> = ({ data }) => {
  const [enableModal, setEnableModal] = useState<{
    confirm: boolean;
    cancel: boolean;
    transfert: ITransfert | null;
  }>({ confirm: false, cancel: false, transfert: null });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [viewtransfertDetails, setViewTransfertDetails] = useState<{
    status: boolean;
    piece: string;
  }>({ status: false, piece: "" });

  const transfertState = useSelector<IRootState>(
    (state) => state.transferts,
  ) as ITransfertState;

  const [tableData, setTableData] = useState<ITransfert[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const sort = transfertState.sort!;

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

    if (sort.column === "source") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DE_src.localeCompare(b.DE_src);
        }
        return b.DE_src.localeCompare(a.DE_src);
      });
      setTableData(sortedData);
      setIsLoading(true);
      return;
    }

    if (sort.column === "destination") {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        if (sort.order) {
          return a.DE_dest.localeCompare(b.DE_dest);
        }
        return b.DE_dest.localeCompare(a.DE_dest);
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
  }, [JSON.stringify(transfertState.sort), JSON.stringify(data)]);

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
                      const sort = transfertState.sort!;
                      dispatch(
                        setFilterSort({ column: "piece", order: !sort.order }),
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
                  <span>Source</span>
                  <button
                    onClick={() => {
                      const sort = transfertState.sort!;
                      dispatch(
                        setFilterSort({ column: "source", order: !sort.order }),
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
                  <span>Destination</span>
                  <button
                    onClick={() => {
                      const sort = transfertState.sort!;
                      dispatch(
                        setFilterSort({
                          column: "destination",
                          order: !sort.order,
                        }),
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
                  <span>Status</span>
                  <button
                    onClick={() => {
                      const sort = transfertState.sort!;
                      dispatch(
                        setFilterSort({ column: "status", order: !sort.order }),
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
              tableData.map((transfert, i) => {
                const MemoizedCta = React.memo(() => {
                  return (
                    <div
                      key={transfert.DO_Piece}
                      className="flex items-center justify-end gap-6"
                    >
                      <button
                        onClick={() => {
                          setViewTransfertDetails({
                            piece: transfert.DO_Piece,
                            status: true,
                          });
                        }}
                      >
                        <IoEye className="h-7 w-7 text-bme-bg" />
                      </button>
                      {!transfert.status && (
                        <button
                          onClick={() => {
                            setEnableModal({
                              cancel: false,
                              confirm: true,
                              transfert: transfert,
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
                    <Table.BodyValue value={transfert.DO_Piece} />
                    <Table.BodyValue value={formatDate(transfert.DO_Date)} />
                    <Table.BodyValue value={transfert.DE_src} />
                    <Table.BodyValue value={transfert.DE_dest} />
                    <Table.BodyValue
                      element={<Status status={transfert.status} />}
                    />
                    <Table.BodyValue element={<MemoizedCta />} />
                  </Table.BodyRow>
                );
              })}
          </Table.Body>
        </Table>
      )}
      {viewtransfertDetails.status && (
        <TransfertDetails
          onRemoveTransfertDetails={setViewTransfertDetails}
          piece={viewtransfertDetails.piece}
        />
      )}
      {enableModal.confirm && (
        <MyPortal
          onClose={() => {
            setEnableModal({
              cancel: false,
              confirm: false,
              transfert: null,
            });
          }}
          isOpen={enableModal.confirm}
          modal={
            <ConfirmTransfertModal
              transfertDetail={enableModal.transfert!}
              closeModal={() => {
                setEnableModal({
                  cancel: false,
                  confirm: false,
                  transfert: null,
                });
              }}
            />
          }
        />
      )}
    </div>
  );
};
