import { Comment, Feedback } from "@/components/Models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FeedbackState = {
  feedback: Feedback[];
  changed: boolean;
};

// initial state for feedback
const initialState: FeedbackState = {
  feedback: [],
  changed: false,
};

// slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackData: (state, action: PayloadAction<Feedback>) => {
      state.feedback.push(action.payload);
      state.changed = true;
    },
    replaceFeedbackData(state, action) {
      state.feedback = action.payload.feedback;
    },
    clearFeedbackData: (state) => {
      state.feedback = [];
      state.changed = true;
    },
    updateComment: (state, action) => {
      console.log(action.payload);
      const { userComment, currentPost, index, currentState } = action.payload;
      console.log(index[0].id); // index in database
      console.log(currentPost);
      console.log(userComment);

      const postToUpdateIndex = currentState.findIndex((post) => post.id === index[0].id);
      console.log(postToUpdateIndex)
      // const postIndex = state.feedback.findIndex(
      //  (post) => post.id === index[0].id
      // );

      if (currentPost && Array.isArray(currentPost.replies)) {
        console.log(`Current post has replies`);

        action.payload.currentPost = {
          ...currentPost,
          replies: [...currentPost.replies, userComment]
        }
       
      } else {
        console.log(`Current post does not have any replies`);

        action.payload.currentPost = {
          ...currentPost,
          replies: [userComment]
        }
        
      }

    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice;
