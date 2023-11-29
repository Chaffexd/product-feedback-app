"use client";
import { feedbackActions } from "@/app/store/feedback-slice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

type FeedbackItem = {
  feedbackId: number;
};

const NewComment = ({ feedbackId }: FeedbackItem) => {
  const newCommentRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState<number>(255);
  const feedbackData = useAppSelector((state) => state.feedback);

  const dispatch = useAppDispatch();

  // use feedbackId to find which post we are on to add the new comment
  const postToAddComment = feedbackData.feedback.filter(
    (item) => item.id === Number(feedbackId)
  );

  const handleInputChange = () => {
    const textInput = newCommentRef.current!.value;
    const remainingCharacters = Math.max(255 - textInput.length, 0);
    setCharCount(remainingCharacters);
  };

  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <form className="w-full bg-white rounded-lg shadow-lg mb-8 p-8">
          <h1>Add Comment</h1>
          <textarea
            className="w-full bg-off-white rounded-lg h-24 mt-4 p-4"
            ref={newCommentRef}
            onChange={handleInputChange}
            maxLength={255}
          />
          <div className="flex justify-between baseline mt-4">
            <p>{charCount} Characters left</p>
            <button
              className="bg-purple text-white rounded-lg h-12 w-32"
              role="button"
              type="button"
              onClick={() => {
                const newUserComment = {
                  feedbackData: feedbackData,
                  currentPost: postToAddComment,
                  newComment: {
                    content: newCommentRef.current?.value,
                    id: Math.floor(Math.random() * Date.now()),
                    replies: [],
                    // this should be the current user
                    user: {
                      image: session.user?.image,
                      name: session.user?.name,
                      username: session.user?.email,
                    },
                  },
                };
                dispatch(feedbackActions.addNewComment(newUserComment));
                newCommentRef.current!.value = "";
              }}
            >
              Post Comment
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default NewComment;
