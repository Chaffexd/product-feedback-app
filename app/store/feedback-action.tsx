import { Dispatch } from "@reduxjs/toolkit";
import uiSlice, { uiActions } from "./ui-slice";
import { feedbackActions } from "./feedback-slice";

type Feedback = {
  title?: string;
  category?: string;
  description?: string;
};

export const fetchFeedbackData = () => {
  return async (dispatch: Dispatch) => {
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
    }
  };
};

export const sendNewFeedback = (feedback: Feedback) => {
  console.log(feedback);
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
        "https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/feedback.json",
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
