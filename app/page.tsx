"use client";
import Feed from "@/components/Feed/Feed";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import Modal from "../components/UI/Modal";
import Notification from "../components/UI/Notification";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";
import { useEffect } from "react";
import { fetchFeedbackData } from "./store/feedback-action";
import { uiActions } from "./store/ui-slice";
import { useSession } from "next-auth/react";

export default function Home() {
  const dispatch = useAppDispatch();
  const isInitialPageLoad = useAppSelector((state: RootState) => state.ui.isInitialPageLoad);
  const feedback = useAppSelector((state: RootState) => state.feedback);
  const notification = useAppSelector(
    (state: RootState) => state.ui.notification
  );
  console.log(feedback.feedback);
  
  useEffect(() => {
    if (isInitialPageLoad) {
      dispatch(fetchFeedbackData());
      dispatch(uiActions.initialPageLoad(false));
      return;
    }
  }, [feedback, dispatch, isInitialPageLoad]);

  const { data: session, status } = useSession();
  console.log("STATUS LOG IN", session, status)

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
