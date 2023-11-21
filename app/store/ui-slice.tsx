import { createSlice } from "@reduxjs/toolkit";

type UiState = {
    addFeedbackIsVisible: boolean;
}

const uiSlice = createSlice({
  name: "ui",
  initialState: { addFeedbackIsVisible: false } as UiState,
  reducers: {
    toggle(state) {
      state.addFeedbackIsVisible = !state.addFeedbackIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
