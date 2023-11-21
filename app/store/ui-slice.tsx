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

let initialNotification: Notification = {
  status: "",
  title: "",
  message: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { addFeedbackIsVisible: false, notification: null } as UiState,
  reducers: {
    toggle(state) {
      state.addFeedbackIsVisible = !state.addFeedbackIsVisible;
    },
    showNotification(state, action) {
      state.notification = action.payload
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
