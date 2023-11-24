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
    /* updateComment: (state, action) => {
      console.log(action.payload);
      const { newComment, currentPost, index, currentState } = action.payload;
      console.log('CURRENT POST ID', index[0].id); // index in database
      console.log('CURRENT POST', currentPost);
      console.log('CURRENT NEW COMMENT', newComment);
      console.log('CURRENT STATE', currentState)

      const findPostData = index[0].id - 1;
      // console.log(currentState[findPostData])
      const stateToUpdate = currentState[findPostData];

      if (currentPost && Array.isArray(currentPost.replies)) {
        console.log(`Current post has replies`);
        const commentToUpdateIndex = stateToUpdate.comments.findIndex(comment => comment.id === currentPost.id);

        const updateComment = action.payload.currentPost = {
          ...currentPost,
          replies: [...currentPost.replies, newComment]
        };
        // must find which comment to update
        stateToUpdate.comments[0][updateComment]
       
      } else {
        console.log(`Current post does not have any replies`);

        const updateComment = action.payload.currentPost = {
          ...currentPost,
          replies: [newComment]
        }
        
        stateToUpdate.comments.
      }

    }, */
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
          replies: [...stateToUpdate.comments[commentToUpdateIndex].replies, newComment],
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
      }
    
      // Update the cloned state array
      updatedState[findPostData] = stateToUpdate;
    
      // Update the state in an immutable way
      state.feedback = updatedState;
      state.changed = true;
    },
/*  */    
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice;
