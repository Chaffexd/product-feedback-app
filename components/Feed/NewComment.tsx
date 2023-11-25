"use client";
import { feedbackActions } from "@/app/store/feedback-slice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRef, useState } from "react";

type FeedbackItem = {
  feedbackId: number;
};

const NewComment = ({ feedbackId }: FeedbackItem) => {
  const newCommentRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState<number>(255);
  const feedbackData = useAppSelector((state) => state.feedback);

  console.log("CURRENTSTATE", feedbackData.feedback);
  const dispatch = useAppDispatch();

  // use feedbackId to find which post we are on to add the new comment
  const postToAddComment = feedbackData.feedback.filter(
    (item) => item.id === Number(feedbackId)
  );
  console.log("THIS POST =======", postToAddComment);

  const handleInputChange = () => {
    const textInput = newCommentRef.current!.value;
    const remainingCharacters = Math.max(255 - textInput.length, 0);
    setCharCount(remainingCharacters);
  };

  return (
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
              currentState: feedbackData.feedback,
              currentPost: postToAddComment,
              newComment: {
                content: newCommentRef.current?.value,
                id: Math.floor(Math.random() * Date.now()),
                replies: [],
                // this should be the current user
                user: {
                  image: "",
                  name: "Current User",
                  username: "Current User",
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
  );
};

export default NewComment;
