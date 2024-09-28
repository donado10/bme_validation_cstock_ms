import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IBill, IBillFilter, IBillState } from "../../Store/features/bills";
import { useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { useLocation, useNavigate } from "react-router-dom";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal, CancelFactModal } from "../Modals/FactureModal";
import { EFilterBills, useFilterData } from "../../Hooks/UseFilterData";
import { formatDate } from "../../Utils/Functions";

const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-extrabold">{name}</h1>;
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
        <div className="custom-animation-fade-in custom-animation-fade-out absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
          <div>
            <Title name={`Facture:  ${billQueryValue}`} />
          </div>
          <Table>
            <Table.Header>
              <Table.HeaderValue
                value={"Référence article"}
                customClass="w-1/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
              />
              <Table.HeaderValue
                value={"Designation article"}
                customClass="w-2/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
              />
              <Table.HeaderValue
                value={"Prix Unitaire HT"}
                customClass="w-1/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
              />
              <Table.HeaderValue
                value={"Quantité"}
                customClass="w-1/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
              />
              <Table.HeaderValue
                value={"Montant HT"}
                customClass="w-1/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
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
                        customClass="border-b-2 border-black py-4 text-center text-xs font-semibold tracking-wider "
                      />
                      <Table.BodyValue
                        value={ligne.DL_Design}
                        customClass="border-b-2 border-black py-2 text-center text-xs font-semibold tracking-wider "
                      />
                      <Table.BodyValue
                        value={ligne.DL_PrixUnitaire}
                        customClass="border-b-2 border-black py-2 text-center text-xs font-semibold tracking-wider "
                      />
                      <Table.BodyValue
                        value={ligne.DL_Qte}
                        customClass="border-b-2 border-black py-2 text-center text-xs font-semibold tracking-wider "
                      />
                      <Table.BodyValue
                        value={ligne.DL_MontantHT}
                        customClass="border-b-2 border-black py-2 text-center text-xs font-semibold tracking-wider "
                      />
                    </Table.BodyRow>
                  );
                })}
            </Table.Body>
          </Table>
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

  const data = useFilterData({
    data: raw_data,
    filterType: filter,
  });

  const [viewBillDetails, setViewBillDetails] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="h-full w-full overflow-scroll rounded-lg border-2 border-black sm:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      <Table>
        <Table.Header>
          <Table.HeaderValue value={"Piece"} />
          <Table.HeaderValue value={"Date"} />
          <Table.HeaderValue value={"Montant HT"} />
          <Table.HeaderValue value={"Montant TTC"} />
          <Table.HeaderValue value={"Status"} />
          <Table.HeaderValue value={"Actions"} />
        </Table.Header>
        <Table.Body>
          {data.length > 0 &&
            data.map((bill, i) => {
              return (
                <Table.BodyRow key={i} rowID={i}>
                  <Table.BodyValue value={bill.DO_Piece} />
                  <Table.BodyValue value={formatDate(bill.DO_Date)} />
                  <Table.BodyValue value={bill.DO_TotalHT} />
                  <Table.BodyValue value={bill.DO_TotalTTC} />
                  <Table.BodyValue value={"Non Validée"} />
                  <Table.BodyValue
                    actions={
                      <div className="flex items-center justify-end gap-6">
                        <button
                          onClick={() => {
                            navigate(`/?bill=${bill.DO_Piece}`);
                            setViewBillDetails(true);
                          }}
                        >
                          <IoEye className="h-7 w-7" />
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
                            <HiCheckCircle className="h-7 w-7" />
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
