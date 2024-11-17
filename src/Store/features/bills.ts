import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBillLigne {
  AR_Ref: string;
  DL_Design: string;
  DL_PrixUnitaire: number;
  DL_Qte: number;
  DL_MontantHT: number;
}

export enum EFilterBills {
  ALL_BILLS,
  VALID_BILLS,
  NO_VALID_BILLS,
  MODIFIED_BILLS,
}

export interface IBill {
  DO_Piece: string;
  DO_Date: string;
  DO_TotalHT: number;
  DO_TotalTTC: number;
  DO_Ligne: IBillLigne[] | [];
  status: boolean;
  modified: boolean;
}

export interface IBillFilter {
  status: EFilterBills;
  date: string | null;
  search: string | number | null;
}

export interface IBillState {
  billLists: IBill[] | [];
  filter?: IBillFilter;
  sort?: { column: string; order: boolean };
}

const initialState: IBillState = {
  billLists: [],
  filter: { status: EFilterBills.ALL_BILLS, date: null, search: null },
  sort: { column: "piece", order: true },
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
    invalidBill: (state, action: PayloadAction<string>) => {
      state.billLists.forEach((bill) => {
        if (bill.DO_Piece === action.payload) {
          bill.status = false;
        }
      });
    },
    setFilters: (state, action: PayloadAction<IBillFilter>) => {
      state.filter = { ...action.payload };
    },
    setModifiedBill: (
      state,
      action: PayloadAction<{ piece: string; value: boolean }>,
    ) => {
      state.billLists.forEach((bill) => {
        if (bill.DO_Piece === action.payload.piece) {
          bill.modified = action.payload.value;
        }
      });
    },
    setSort: (
      state,
      action: PayloadAction<{ column: string; order: boolean }>,
    ) => {
      state.sort = action.payload;
    },
  },
});

export default billSlice;
export const {
  addBills,
  setFilters,
  setModifiedBill,
  validateBill,
  invalidBill,
  setSort,
} = billSlice.actions;
