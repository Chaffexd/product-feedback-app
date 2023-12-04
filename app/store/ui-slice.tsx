import { Feedback } from "@/components/Models/models";
import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  addFeedbackIsVisible: boolean;
  notification: Notification | null;
  isLoading: boolean;
  isInitialPageLoad: boolean;
  replyingUsername: string;
};

type Notification = {
  status: string;
  title: string;
  message: string;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { addFeedbackIsVisible: false, notification: null, isLoading: true, isInitialPageLoad: true, replyingUsername: 'null', } as UiState,
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
    },
    isReplying(state, action) {
      state.replyingUsername = action.payload
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
