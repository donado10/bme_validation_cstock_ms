import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { IBill, IBillFilter } from "../../Store/features/bills";
import { useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { useLocation, useNavigate } from "react-router-dom";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal } from "../Modals/FactureModal";
import { useFilterData } from "../../Hooks/UseFilterData";
import { formatDate, formatNumberWithSpace } from "../../Utils/Functions";
import Status from "../Status";
import { FaSort } from "react-icons/fa";

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-extrabold text-bme-800">{name}</h1>;
};

const BillDetails: React.FC<{ onRemoveBillDetails: React.Dispatch<any> }> = ({
  onRemoveBillDetails,
}) => {
  const [data, setData] = useState<IBill | null>(null);
  const billSelector = useSelector((state: IRootState) => state.bills);
  const navigate = useNavigate();
  const location = useLocation();
  const billQueryValue = location.search.split("=")[1];
  useEffect(() => {
    const bill = billSelector.billLists.find(
      (bill) => bill.DO_Piece === billQueryValue,
    );

    if (bill) {
      setData(bill);
    }
  }, [location]);

  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black/50"
      onClick={() => {
        onRemoveBillDetails(false);
        navigate("/");
      }}
    >
      <div className="relative h-screen w-screen bg-transparent">
        <div className="custom-animation-fade-in absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
          <div>
            <Title name={`${billQueryValue}`} />
          </div>
          <div className="border-bme-bg h-fit w-full overflow-scroll rounded-lg border-2 sm:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            <Table>
              <Table.Header>
                <Table.HeaderValue
                  value={"Référence article"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md"
                />
                <Table.HeaderValue
                  value={"Designation article"}
                  customClass="w-2/6  border-r-2 border-gray-300/15  py-2 text-center text-md"
                />
                <Table.HeaderValue
                  value={"Prix Unitaire HT"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md"
                />
                <Table.HeaderValue
                  value={"Quantité"}
                  customClass="w-1/6  border-r-2 border-gray-300/15  py-2 text-center text-md"
                />
                <Table.HeaderValue
                  value={"Montant HT"}
                  customClass="w-1/6   border-gray-300/15  py-2 text-center text-md"
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
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-semibold tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Design}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-semibold tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(ligne.DL_PrixUnitaire)}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-semibold tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={ligne.DL_Qte}
                          customClass="border-r-2 border-gray-300 px-4 py-2 text-center text-xs font-semibold tracking-wider first:text-left last:text-right text-bme-800 "
                        />
                        <Table.BodyValue
                          value={formatNumberWithSpace(ligne.DL_MontantHT)}
                          customClass="px-4 py-2 text-center text-xs font-semibold tracking-wider  text-bme-800 "
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
    bill: string;
  }>({ confirm: false, cancel: false, bill: "" });

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

  const [viewBillDetails, setViewBillDetails] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="border-bme-bg h-fit w-full overflow-scroll rounded-lg border-2 sm:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
                            navigate(`/?bill=${bill.DO_Piece}`);
                            setViewBillDetails(true);
                          }}
                        >
                          <IoEye className="text-bme-bg h-7 w-7" />
                        </button>
                        {!bill.status && (
                          <button
                            onClick={() => {
                              setEnableModal({
                                cancel: false,
                                confirm: true,
                                bill: bill.DO_Piece,
                              });
                              navigate(`/?bill=${bill.DO_Piece}`);
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
      {viewBillDetails && (
        <BillDetails onRemoveBillDetails={setViewBillDetails} />
      )}
      {enableModal.confirm && (
        <MyPortal
          onClose={() => {
            setEnableModal({ cancel: false, confirm: false, bill: "" });
            navigate("/");
          }}
          isOpen={enableModal.confirm}
          modal={
            <ConfirmFactModal
              bill={enableModal.bill}
              closeModal={() => {
                setEnableModal({ cancel: false, confirm: false, bill: "" });
                navigate("/");
              }}
            />
          }
        />
      )}
    </div>
  );
};
