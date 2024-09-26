import { useEffect, useState } from "react";
import Table from "./Table";
import { IoEye } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { IBill } from "../../Store/features/bills";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Store/store";
import { addBills } from "../../Store/features/bills";
import { useLocation, useNavigate } from "react-router-dom";
import MyPortal from "../Modals/Overlay";
import { ConfirmFactModal, CancelFactModal } from "../Modals/FactureModal";

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

  console.log(data);
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black/50"
      onClick={() => {
        onRemoveBillDetails(false);
        navigate("/");
      }}
    >
      <div className="relative h-screen w-screen bg-transparent">
        <div className="absolute right-0 top-0 flex h-full w-4/5 flex-col gap-8 bg-white p-4">
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
                customClass="w-1/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
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
              <Table.HeaderValue
                value={"Actions"}
                customClass="w-1/6 border-2 border-[#282B30] py-2 text-center text-md text-black"
              />
            </Table.Header>
            <Table.Body>
              {data &&
                data?.DL_Ligne?.length > 0 &&
                data.DL_Ligne.map((ligne, i) => {
                  console.log(ligne);
                  return (
                    <Table.BodyRow key={i} pieceID={ligne.AR_Ref}>
                      <Table.BodyValue
                        value={ligne.AR_Ref}
                        customClass="border-b-2 border-black py-2 text-center text-xs font-semibold tracking-wider "
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
                      <Table.BodyValue
                        actions={
                          <div className="flex items-center justify-end gap-6">
                            <button className="">
                              <IoIosCloseCircle className="h-7 w-7" />
                            </button>
                            <button className="">
                              <HiCheckCircle className="h-7 w-7" />
                            </button>
                          </div>
                        }
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

export const TableContainer = () => {
  const [enableModal, setEnableModal] = useState<{
    confirm: boolean;
    cancel: boolean;
  }>({ confirm: false, cancel: false });
  const [data, setData] = useState<IBill[]>([]);
  const [viewBillDetails, setViewBillDetails] = useState<boolean>(false);
  //const billSelector = useSelector((state: IRootState) => state.bills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((bills) => {
        setData(bills);
        dispatch(addBills(bills));
      });
  }, []);

  return (
    <div className="h-full w-full overflow-scroll p-5 sm:overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
                <Table.BodyRow key={i} pieceID={bill.DO_Piece}>
                  <Table.BodyValue value={bill.DO_Piece} />
                  <Table.BodyValue value={bill.DO_Date} />
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

                        <button
                          onClick={() => {
                            setEnableModal({ cancel: false, confirm: true });
                            navigate(`/?bill=${bill.DO_Piece}`);
                          }}
                        >
                          <HiCheckCircle className="h-7 w-7" />
                        </button>
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
            setEnableModal({ cancel: false, confirm: false });
            navigate("/");
          }}
          isOpen={enableModal.confirm}
          modal={<ConfirmFactModal />}
        />
      )}
      {enableModal.cancel && (
        <MyPortal
          onClose={() => {
            setEnableModal({ cancel: false, confirm: false });
            navigate("/");
          }}
          isOpen={enableModal.cancel}
          modal={<CancelFactModal />}
        />
      )}
    </div>
  );
};
