import { Comment, Feedback } from "@/components/Models/models";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewCommentToDatabase,
  deletePostData,
  sendNewFeedback,
  updateCommentInDatabase,
  updatePostData,
  upvoteInDatabase,
} from "./feedback-action";
import { RootState } from "./store";

type FeedbackState = {
  feedback: Feedback[];
  changed: boolean;
};

// initial state for feedback
const initialState: FeedbackState = {
  feedback: [],
  changed: false,
};

export const addNewCommentAsync = createAsyncThunk(
  "feedback/addNewComment",
  async ({
    newComment,
    currentPost,
  }: {
    newComment: Comment;
    currentPost: Feedback;
  }) => {
    const postIdToUpdate = currentPost.id;
    const currentComments = currentPost.comments || [];
    const updatedComments = [...currentComments, newComment];
    const newPostComments = {
      ...currentPost,
      comments: updatedComments,
    };
    await addNewCommentToDatabase(postIdToUpdate, newPostComments);
    return newPostComments;
  }
);

export const upvoteFeedbackInFirebaseAsync = createAsyncThunk(
  "feedback/upvoteFeedbackInFirebase",
  async (feedbackId: number, thunkAPI) => {
    try {
      // Fetch the updated feedback item from the current state
      const state = thunkAPI.getState() as RootState; // Assume RootState is your root state type
      const feedbackItem = state.feedback.feedback.find(
        (item) => item.id === Number(feedbackId)
      );

      if (feedbackItem) {
        const updatedUpvotes = feedbackItem.upvotes + 1;

        await upvoteInDatabase(feedbackId, updatedUpvotes);
        return feedbackId;
      } else {
        throw new Error(`Feedback item with id ${feedbackId} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
);

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
      const findPostData = index[0].id; // this is the post ID
      console.log("cURRENT STATE", findPostData)

      // Clone the currentState array
      const updatedState = currentState.slice();

      const commentToUpdate = updatedState.find(
        (item: any) => item.id === findPostData
      );

      // Clone the state to update
      const stateToUpdate = { ...commentToUpdate };
      console.log("STATE TO UPDATE", stateToUpdate)

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
      console.log("UPDATED STATE W INDEX", updatedState[findPostData])

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
      const { newComment, currentPost, feedbackData } = action.payload;
      // we -1 because the index in the firebase is different to what is local
      console.log("CURRENT POST=====", currentPost[0].id);
      const postIdToUpdate = currentPost[0].id;
      // if there are no comments, one will be created
      const currentComments = currentPost[0].comments || [];
      const newPostComments = {
        ...currentPost[0],
        comments: [...currentComments, newComment],
      };
      console.log("POST WITH NEW COMMENT", newPostComments);
      console.log("CURRENT STATE", feedbackData.feedback);

      // copy the existing post
      // add the new comment, to existing comments
      // or recreate the comments key array
      // and join all comments together
      const updatedFeedback = feedbackData.feedback.map((post: Feedback) =>
        post.id === postIdToUpdate
          ? { ...post, comments: [...currentComments, newComment] }
          : post
      );
      addNewCommentToDatabase(postIdToUpdate, newPostComments);
      return {
        ...state,
        feedback: updatedFeedback,
        changed: true,
      };
    },
    updatePost(state, action) {
      const { currentPostDetail } = action.payload;
      const { category, title, status } = action.payload;

      console.log("CURRENT POST DETAILS =======", currentPostDetail);
      const updatedPostDetails = {
        ...currentPostDetail,
        title,
        category,
        status,
      };

      console.log("THIS IS THE UPDATED PIECE OF DATA", updatedPostDetails);
      const updatedFeedback = state.feedback.map((post) =>
        post.id === updatedPostDetails.id ? updatedPostDetails : post
      );
      updatePostData(currentPostDetail.id, updatedPostDetails);

      return {
        ...state,
        feedback: updatedFeedback,
        changed: true,
      };
    },
    deletePost(state, action) {
      const { feedbackId } = action.payload;
      // console.log("FEEDBACK ID", feedbackId);
      // console.log("ALL POSTS ============ ", allPosts);

      // this removes the current post you are deleting from the state
      const updatedFeedback = state.feedback.filter(
        (post) => Number(post.id) !== Number(feedbackId)
      );
      console.log("UPDATED FEEDBACK=========", updatedFeedback);

      deletePostData(feedbackId);

      const newState = {
        ...state,
        feedback: updatedFeedback,
        changed: true,
      };
      console.log("NEW STATE", newState);
      return newState;
    },
    clearState(state) {
      state.changed = false;
    },
    upvoteFeedback(state, action) {
      const feedbackId = action.payload;
      const feedbackIndex = state.feedback.findIndex(
        (item) => item.id === Number(feedbackId)
      );

      if (feedbackIndex !== -1) {
        state.feedback[feedbackIndex].upvotes += 1;
        state.changed = true;

        // upvoteInDatabase(feedbackId, updatedUpvotes)
      }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewCommentAsync.fulfilled, (state, action) => {
      state.changed = true;
      state.feedback.push(action.payload);
    });
    builder.addCase(
      upvoteFeedbackInFirebaseAsync.fulfilled,
      (state, action) => {
        state.changed = true;
        const feedbackId = action.payload;
        const feedbackIndex = state.feedback.findIndex(
          (item) => item.id === Number(feedbackId)
        );
  
        if (feedbackIndex !== -1) {
          state.feedback[feedbackIndex].upvotes += 1;
          state.changed = true;
        }
      }
    );
  },
});

export const feedbackActions = { ...feedbackSlice.actions, addNewCommentAsync, upvoteFeedbackInFirebaseAsync };
export default feedbackSlice;
