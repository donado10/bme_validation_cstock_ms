import { configureStore } from "@reduxjs/toolkit";
import billSlice from "./features/bills";
import transfertSlice from "./features/transfert";
import retourSlice from "./features/retour";

export const store = configureStore({
  reducer: {
    bills: billSlice.reducer,
    transferts: transfertSlice.reducer,
    retours: retourSlice.reducer,
  },
});
export type IRootState = ReturnType<typeof store.getState>;
