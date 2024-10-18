import { configureStore } from "@reduxjs/toolkit";
import billSlice from "./features/bills";
import transfertSlice from "./features/transfert";

export const store = configureStore({
  reducer: { bills: billSlice.reducer, transferts: transfertSlice.reducer },
});
export type IRootState = ReturnType<typeof store.getState>;
