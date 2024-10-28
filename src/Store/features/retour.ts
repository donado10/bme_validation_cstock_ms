import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRetourLigne {
  AR_Ref: string;
  DL_Design: string;
  DL_PrixUnitaire: number;
  DL_Qte: number;
  DL_MontantHT: number;
}

export enum EFilterRetours {
  ALL_RETOURS,
  VALID_RETOURS,
  NO_VALID_RETOURS,
}

export interface IRetour {
  DO_Piece: string;
  DO_Date: string;
  DO_TotalHT: number;
  DO_TotalTTC: number;
  DO_Ligne: IRetourLigne[] | [];
  status: boolean;
}

export interface IRetourFilter {
  status: EFilterRetours;
  date: string | null;
  search: string | number | null;
}

export interface IRetourState {
  retourLists: IRetour[] | [];
  filter?: IRetourFilter;
  sort?: { column: string; order: boolean };
}

const initialState: IRetourState = {
  retourLists: [],
  filter: { status: EFilterRetours.ALL_RETOURS, date: null, search: null },
  sort: { column: "piece", order: true },
};

const retourSlice = createSlice({
  name: "retours",
  initialState,
  reducers: {
    addRetours: (state, action: PayloadAction<IRetour[]>) => {
      state.retourLists = [...action.payload];
    },
    validateRetour: (state, action: PayloadAction<string>) => {
      state.retourLists.forEach((retour) => {
        if (retour.DO_Piece === action.payload) {
          retour.status = true;
        }
      });
    },
    setRetourFilters: (state, action: PayloadAction<IRetourFilter>) => {
      state.filter = { ...action.payload };
    },
    setSort: (
      state,
      action: PayloadAction<{ column: string; order: boolean }>,
    ) => {
      state.sort = action.payload;
    },
  },
});

export default retourSlice;
export const { addRetours, setRetourFilters, validateRetour, setSort } =
  retourSlice.actions;
