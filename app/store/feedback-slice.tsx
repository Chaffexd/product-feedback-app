import { Comment, Feedback } from "@/components/Models/models";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { addNewCommentToDatabase, updateCommentInDatabase } from "./feedback-action";

type FeedbackState = {
  feedback: Feedback[];
  changed: boolean;
};

// initial state for feedback
const initialState: FeedbackState = {
  feedback: [],
  changed: false,
};

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
      const { newComment, currentPost, index, currentState } = action.payload;
      const findPostData = index[0].id - 1;

      // Clone the currentState array
      const updatedState = currentState.slice();

      // Clone the state to update
      const stateToUpdate = { ...updatedState[findPostData] };

      if (currentPost && Array.isArray(currentPost.replies)) {
        console.log(`Current post has replies`);

        const commentToUpdateIndex = stateToUpdate.comments.findIndex(
          (comment: Comment) => comment.id === currentPost.id
        );

        // Clone the comment and update the replies
        const updatedComment = {
          ...stateToUpdate.comments[commentToUpdateIndex],
          replies: [
            ...stateToUpdate.comments[commentToUpdateIndex].replies,
            newComment,
          ],
        };

        // Clone the comments array and update the comment
        const updatedComments = [
          ...stateToUpdate.comments.slice(0, commentToUpdateIndex),
          updatedComment,
          ...stateToUpdate.comments.slice(commentToUpdateIndex + 1),
        ];

        // Update the cloned state with the modified comments array
        stateToUpdate.comments = updatedComments;
      } else {
        console.log(`Current post does not have any replies`);

        const commentToUpdateIndex = stateToUpdate.comments.findIndex(
          (comment: Comment) => comment.id === currentPost.id
        );

        // Clone the comment and set the replies to a new array with the new comment
        const updatedComment = {
          ...stateToUpdate.comments[commentToUpdateIndex],
          replies: [newComment],
        };

        // Clone the comments array and update the comment
        const updatedComments = [
          ...stateToUpdate.comments.slice(0, commentToUpdateIndex),
          updatedComment,
          ...stateToUpdate.comments.slice(commentToUpdateIndex + 1),
        ];

        // Update the cloned state with the modified comments array
        stateToUpdate.comments = updatedComments;
        console.log("UPDATEDCOMMENTS", updatedComments);
      }

      // Update the cloned state array
      updatedState[findPostData] = stateToUpdate;

      console.log("UPDATED STATE=====", updatedState);
      // Update the state in an immutable way LOCALLY
      state.feedback = updatedState;
      state.changed = true;

      // update the database at the same time
      updateCommentInDatabase(
        findPostData,
        updatedState[findPostData].comments
      );
    },
    addNewComment(state, action) {
      const { newComment, currentPost, currentState } = action.payload;

      console.log("THIS IS THE POST ID TO UPDATE", currentPost[0].id)
      // we -1 because the index in the firebase is different to what is local
      const postIdToUpdate = currentPost[0].id - 1;
      // gets the length of the comments array and adds 1 to keep IDs from overlapping
      // and to keep the array indexed nicely
      const currentComments = currentPost[0].comments || [];
      // const currentCommentLength = currentPost.length;
      // console.log(currentComments)
      const updatedComments = {
        comments: [ newComment ]
      };
      console.log("THIS IS THE NEW POST WITH NEW COMMENTS===", updatedComments);

      // take the current state
      // clone it
      // find the comment in the current state
      // replace it
      // dispatch it to redux store
      // trigger redux store update
     

      /* updateThisState[postIdToUpdate] = stateToUpdate;
      state.feedback = updateThisState
      state.changed = true; */
      
      addNewCommentToDatabase(postIdToUpdate, updatedComments);
      state.changed = true;
    },
  },
});

export const feedbackActions = { ...feedbackSlice.actions };
export default feedbackSlice;
