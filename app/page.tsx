"use client";
import Feed from "@/components/Feed/Feed";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import Modal from "../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { RootState } from "./store";
import { useEffect } from "react";
import { sendNewFeedback, fetchFeedbackData } from "./store/feedback-action";

let initialPageLoad = true;

export default function Home() {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state: RootState) => state.feedback);
  console.log(feedback.feedback)


  useEffect(() => {
    if (initialPageLoad) {
      dispatch(fetchFeedbackData());
      initialPageLoad = false;
      return;
    }

    if (feedback.changed) {
      console.log("Submission sent")
      dispatch(sendNewFeedback(feedback.feedback[feedback.feedback.length - 1]));
    }
  }, [feedback, dispatch]);

  return (
    <>
      <Modal />
      <InfoPanel />
      <main className="w-3/4">
        <Feed />
      </main>
    </>
  );
}
