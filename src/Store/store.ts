import { configureStore } from "@reduxjs/toolkit";
import billSlice from "./features/bills";

export const store = configureStore({
  reducer: { bills: billSlice.reducer },
});
export type IRootState = ReturnType<typeof store.getState>;
