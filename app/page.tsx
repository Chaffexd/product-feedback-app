"use client";
import Feed from "@/components/Feed/Feed";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import Modal from "../components/UI/Modal";
import Notification from "../components/UI/Notification";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";
import { useEffect } from "react";
import { sendNewFeedback, fetchFeedbackData } from "./store/feedback-action";

let initialPageLoad = true;

export default function Home() {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state: RootState) => state.feedback);
  const notification = useAppSelector(
    (state: RootState) => state.ui.notification
  );
  console.log(feedback.feedback);

  useEffect(() => {
    if (initialPageLoad) {
      dispatch(fetchFeedbackData());
      initialPageLoad = false;
      return;
    }

    if (feedback.changed) {
      console.log("Submission sent");
      // will always send the last (newest) item in the feedback array
      // there must be a better way for this
      dispatch(
        sendNewFeedback(feedback.feedback[feedback.feedback.length - 1])
      );
    }
  }, [feedback, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification?.title}
          message={notification?.message}
          status={notification?.status}
        />
      )}
      <Modal />
      <InfoPanel />
      <main className="w-3/4">
        <Feed />
      </main>
    </>
  );
}
