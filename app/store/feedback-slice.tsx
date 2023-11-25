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
      const { newComment, currentPost } = action.payload;
      // we -1 because the index in the firebase is different to what is local
      const postIdToUpdate = currentPost[0].id - 1;
      // if there are no comments, one will be created
      const currentComments = currentPost[0].comments || [];
      // const currentCommentLength = currentPost.length;

      const newPostComments = {
        ...currentPost[0],
        comments: [...currentComments, newComment]
      };

      // copy the existing post
      // add the new comment, to existing comments
      // or recreate the comments key array 
      // and join all comments together
      
      addNewCommentToDatabase(postIdToUpdate, newPostComments);
      state.changed = true;
      
    },
  },
});

export const feedbackActions = { ...feedbackSlice.actions };
export default feedbackSlice;
