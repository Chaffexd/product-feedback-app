import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  addFeedbackIsVisible: boolean;
  notification: Notification | null;
  isLoading: boolean;
  isInitialPageLoad: boolean
};

type Notification = {
  status: string;
  title: string;
  message: string;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { addFeedbackIsVisible: false, notification: null, isLoading: true, isInitialPageLoad: true } as UiState,
  reducers: {
    toggle(state) {
      state.addFeedbackIsVisible = !state.addFeedbackIsVisible;
    },
    initialPageLoad(state, action) {
      state.isInitialPageLoad = action.payload;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    hideNotification(state) {
      state.notification = null;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
