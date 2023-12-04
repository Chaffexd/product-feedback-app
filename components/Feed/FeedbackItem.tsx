"use client";
import { fetchFeedbackData } from "@/app/store/feedback-action";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import ArrowUp from "@/assets/shared/ArrowUp";
import Comments from "@/assets/shared/Comments";
import React, { useEffect, useState } from "react";
import FeedbackItemComments from "./FeedbackItemComments";
import { feedbackActions } from "@/app/store/feedback-slice";
import { useSession } from "next-auth/react";
import LogInModal from "../UI/LogInModal";

type FeedbackItem = {
  feedbackId: number;
};

const FeedbackItem = ({ feedbackId }: FeedbackItem) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const feedbackData = useAppSelector((state) => state.feedback);
  const isInitialPageLoad = useAppSelector(
    (state) => state.ui.isInitialPageLoad
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const singleFeedbackItem = feedbackData.feedback.filter(
    (item) => item.id === Number(feedbackId)
  );

  useEffect(() => {
    if (isInitialPageLoad) {
      dispatch(fetchFeedbackData());
      dispatch(uiActions.initialPageLoad(false));
      return;
    }
  }, [dispatch, isInitialPageLoad, feedbackData.changed]);

  const { data: session, status } = useSession();

  const upvoteSubmission = () => {
    console.log('THE PIECE TO UPVOTE ===', singleFeedbackItem[0].upvotes)
    if (status === 'authenticated') {
      dispatch(feedbackActions.upvoteFeedbackInFirebaseAsync(feedbackId));
    } else {
      openModal();
    }
  };

  return (
    <>
      {showModal && <LogInModal message="Please log in to cast an upvote!" onClose={closeModal} />}
      <article className="w-full bg-white shadow-md p-8 rounded-lg my-4 flex justify-between items-center">
        <div className="flex">
          <div className="mr-8 flex justify-center w-12">
            <button className="bg-grey p-2 h-14 rounded-lg flex flex-col items-center" onClick={upvoteSubmission}>
              <ArrowUp />
              <span className="mt-2">{singleFeedbackItem[0]?.upvotes}</span>
            </button>
          </div>
          <div>
            <h1 className="font-bold text-slate mb-4">
              {singleFeedbackItem[0]?.title}
            </h1>
            <p className="font-md text-slate mb-2">
              {singleFeedbackItem[0]?.description}
            </p>
            <button className="p-2 bg-grey rounded-lg py-2 px-4 text-blue h-10 w-auto mr-4 text-center font-normal">
              {singleFeedbackItem[0]?.category}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <i>
            <Comments />
          </i>
          <p className="pl-2">
            {singleFeedbackItem[0]?.comments?.length === undefined
              ? 0
              : singleFeedbackItem[0]?.comments?.length}
          </p>
        </div>
      </article>
      <FeedbackItemComments comments={singleFeedbackItem} />
    </>
  );
};

export default FeedbackItem;
