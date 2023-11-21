import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// the type definition for what we expect
type FeedbackItem = {
  title?: string;
  category?: string;
  description?: string;
};

type FeedbackState = {
    feedback: FeedbackItem[];
    changed: boolean
}

// initial state for feedback
const initialState: FeedbackState = {
  feedback: [],
  changed: false
};

// slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackData: (
      state,
      action: PayloadAction<FeedbackItem>
    ) => {
      state.feedback.push(action.payload)
      state.changed = true;
    },
    replaceFeedbackData(state, action) {
        state.feedback = action.payload.feedback;
    },
    clearFeedbackData: (state) => {
      state.feedback = [];
      state.changed = true;
    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice;
