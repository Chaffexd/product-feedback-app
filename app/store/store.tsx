import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import feedbackSlice from "./feedback-slice";

export const store = configureStore({
  reducer: { ui: uiSlice.reducer, feedback: feedbackSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
