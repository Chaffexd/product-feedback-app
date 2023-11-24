import { Dispatch } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { feedbackActions } from "./feedback-slice";
import { Comment } from "@/components/Models/models";

type Feedback = {
  title?: string;
  category?: string;
  description?: string;
};

export const fetchFeedbackData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(uiActions.startLoading());

    const fetchFeedback = async () => {
      const response = await fetch(
        "https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data...");
      }

      const data = await response.json();
      return data;
    };

    try {
      const allFeedback = await fetchFeedback();
      // I need to format the data once it comes back from FB as FB adds its own key
      const formattedFeedback = Object.keys(allFeedback).map((key) => ({
        id: key,
        ...allFeedback[key],
      }));

      dispatch(
        feedbackActions.replaceFeedbackData({
          feedback: formattedFeedback,
        })
      );
    } catch (error) {
      // deal with error
    } finally {
      dispatch(uiActions.stopLoading());
    }
  };
};

export const sendNewFeedback = (feedback: Feedback) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending your feedback...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json",
        {
          method: "POST",
          body: JSON.stringify(feedback),
        }
      );

      if (!response.ok) {
        throw new Error("Sending feedback failed :( ");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully shared your feedback",
        })
      );

      // remove the banner after 2 secs
      setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 2000);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending feedback failed.",
        })
      );
    }
  };
};

export const updateCommentInDatabase = async (postId: number, updatedComments: Comment[]) => {
  try {
    const response = await fetch(
      `https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests/${postId}.json`,
      {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: updatedComments }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update database');
    }
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
};
