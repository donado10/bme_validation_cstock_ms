import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITransfertLigne {
  AR_Ref: string;
  DL_Design: string;
  DL_PrixUnitaire: number;
  DL_Qte: number;
  DL_MontantHT: number;
  status: boolean;
}

export interface ITransfert {
  DO_Piece: string;
  DO_Date: string;
  DE_src: string;
  DE_dest: string;
  DL_Ligne: string;
  DO_Ligne: ITransfertLigne[] | [];
  status: boolean;
}

export enum EFilterTransferts {
  ALL_TRANSFERTS,
  VALID_TRANSFERTS,
  NO_VALID_TRANSFERTS,
}

export interface ITransfertFilter {
  status: EFilterTransferts;
  date: string | null;
  search: string | number | null;
  warehouse: {
    src: string | null;
    dest: string | null;
  };
}

export interface ITransfertState {
  transfertLists: ITransfert[] | [];
  filter?: ITransfertFilter;
  sort?: { column: string; order: boolean };
}

const initialState: ITransfertState = {
  transfertLists: [],
  filter: {
    status: EFilterTransferts.ALL_TRANSFERTS,
    date: null,
    search: null,
    warehouse: {
      src: null,
      dest: null,
    },
  },
  sort: { column: "piece", order: true },
};

const transfertSlice = createSlice({
  name: "transferts",
  initialState,
  reducers: {
    addTransferts: (state, action: PayloadAction<ITransfert[]>) => {
      state.transfertLists = [...action.payload];
    },
    validateTransfert: (state, action: PayloadAction<string>) => {
      state.transfertLists.forEach((transfert) => {
        if (transfert.DO_Piece === action.payload) {
          transfert.status = true;
          transfert.DO_Ligne.forEach((ligne) => (ligne.status = true));
        }
      });
    },
    setTransfertFilters: (state, action: PayloadAction<ITransfertFilter>) => {
      state.filter = { ...action.payload };
    },
    setFilterSort: (
      state,
      action: PayloadAction<{ column: string; order: boolean }>,
    ) => {
      state.sort = action.payload;
    },
  },
});

export default transfertSlice;
export const {
  addTransferts,
  setTransfertFilters,
  validateTransfert,
  setFilterSort,
} = transfertSlice.actions;
