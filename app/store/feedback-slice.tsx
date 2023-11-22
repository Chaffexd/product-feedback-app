import { Feedback } from "@/components/Models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FeedbackState = {
    feedback: Feedback[];
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
      action: PayloadAction<Feedback>
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
