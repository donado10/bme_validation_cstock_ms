import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../Store/store";
import { IBill, IBillState } from "../Store/features/bills";
import Title from "../Components/Title";
import { BillDetails } from "../Components/Table/TableBillDetails";

type Props = {};

const Bill = (props: Props) => {
  const { billID } = useParams();
  const billState = useSelector<IRootState>(
    (state) => state.bills,
  ) as IBillState;

  useEffect(() => {
    const bill = billState.billLists.find(
      (bill) => bill.DO_Piece.toLowerCase() === billID?.toLowerCase(),
    );

    console.log(bill);
  }, []);

  return (
    <div className="p-4">
      <div className="flex min-h-screen w-[55rem] flex-col gap-4 p-2">
        <div className="billHeader">
          <Title name={billID!} />
        </div>
        <div className="h-screen rounded-lg border-2 border-bme-600/25 p-4">
          <div>
            <BillDetails piece={billID!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
