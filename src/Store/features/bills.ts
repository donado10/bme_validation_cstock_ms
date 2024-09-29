import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EFilterBills } from "../../Hooks/UseFilterData";

export interface IBillLigne {
  AR_Ref: string;
  DL_Design: string;
  DL_PrixUnitaire: number;
  DL_Qte: number;
  DL_MontantHT: number;
}

export interface IBill {
  DO_Piece: string;
  DO_Date: string;
  DO_TotalHT: number;
  DO_TotalTTC: number;
  DO_Ligne: IBillLigne[] | [];
  status: boolean;
}

export interface IBillFilter {
  status: EFilterBills;
  date: string | null;
  search: string | number | null;
}

export interface IBillState {
  billLists: IBill[] | [];
  filter?: IBillFilter;
  sort?: string;
}

const initialState: IBillState = {
  billLists: [],
  filter: { status: EFilterBills.ALL_BILLS, date: null, search: null },
};

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBills: (state, action: PayloadAction<IBill[]>) => {
      state.billLists = [...action.payload];
    },
    validateBill: (state, action: PayloadAction<string>) => {
      state.billLists.forEach((bill) => {
        if (bill.DO_Piece === action.payload) {
          bill.status = true;
        }
      });
    },
    setFilters: (state, action: PayloadAction<IBillFilter>) => {
      state.filter = { ...action.payload };
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
});

export default billSlice;
export const { addBills, setFilters, validateBill } = billSlice.actions;
