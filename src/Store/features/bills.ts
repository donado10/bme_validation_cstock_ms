import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  DL_Ligne: IBillLigne[] | [];
}

export interface IBillState {
  billLists: IBill[] | [];
}

const initialState: IBillState = {
  billLists: [],
};

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBills: (state, action: PayloadAction<IBillState>) => {
      state.billLists = [...action.payload];
    },
  },
});

export default billSlice;
export const { addBills } = billSlice.actions;
