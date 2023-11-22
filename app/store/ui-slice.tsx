import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  addFeedbackIsVisible: boolean;
  notification: Notification | null;
};

type Notification = {
  status: string;
  title: string;
  message: string;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { addFeedbackIsVisible: false, notification: null } as UiState,
  reducers: {
    toggle(state) {
      state.addFeedbackIsVisible = !state.addFeedbackIsVisible;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
